import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { GqlUtil } from '../utils/gql.utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlUtil.getGqlContext(context);
    const now = Date.now();
    const processUuid = v4();
    gqlContext.req.processUuid = processUuid;
    const handler = context.getArgByIndex(3);
    const handlerName = handler.fieldName;
    const parentType = handler.parentType.name;

    this.logger.log(
      `Start process '${processUuid}' » type: '${parentType}' » handler: '${handlerName}' at '${now}' input: ${JSON.stringify(
        context.getArgByIndex(1),
      )}`,
    );
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Finished process '${processUuid}' » type: '${parentType}' » handler: '${handlerName}' after: '${Date.now() -
              now}ms'`,
          ),
        ),
      );
  }
}
