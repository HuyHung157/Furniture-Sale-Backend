import { CanActivate, ExecutionContext, Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonConstants } from '../constants/common.constants';
import { EnvironmentService } from '../environment/environment.service';
import { FirebaseAdminService } from '../modules/firebase/services/firebase-admin.service';
import { GqlUtil } from '../utils/gql.utils';
import { StringUtil } from '../utils/string.utils';
import { UuidUtils } from '../utils/uuid.utils';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly environmentService: EnvironmentService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlUtil.getGqlContext(context);
    const authHeader =
      gqlContext.req.headers[CommonConstants.AUTHORIZATION_HTTP_REQUEST_HEADER];

    if (authHeader) {
      const authParams = StringUtil.parseAuthHeader(authHeader);

      if (
        authParams.scheme &&
        authParams.scheme.toLowerCase() ===
        CommonConstants.AUTHORIZATION_HEADER_BEARER.toLowerCase() &&
        authParams.value
      ) {
        try {
          const decodedUser = await this.firebaseAdmin.verifyIdToken(authParams.value);
          const namespace = this.environmentService.getKey(CommonConstants.UUID_V5_NAMESPACE);
          const id = decodedUser.user_uuid || UuidUtils.getUuidFromFirebaseUid(decodedUser.uid, namespace);
          const user = {
            id,
            ...decodedUser,
          };
          // Context request user
          gqlContext.req.user = user;
          return true;
        } catch (err) {
          this.logger.error(err);
        }
      }
    }
    return false;
  }
}
