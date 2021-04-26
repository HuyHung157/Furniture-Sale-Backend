import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GqlUtil } from '../utils/gql.utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlUtil.getGqlContext(context);
    const processUuid = gqlContext.req.processUuid || '';

    return next.handle().pipe(
      catchError(error => {
        this.logger.error(`Error process '${processUuid}': ${error.message}`);
        this.logger.error(error.stack);
        throw error;
      }),
    );
  }
}
