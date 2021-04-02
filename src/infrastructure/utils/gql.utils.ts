import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface IGqlContext {
  req: IGqlRequest;
  res: any;
}

export interface IGqlRequest {
  headers: any;
  user: any;
  processUuid?: any;
}

export class GqlUtil {
  public static getGqlContext(context: ExecutionContext): IGqlContext {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext();
  }

  public static getGqlRequest(context: ExecutionContext): IGqlRequest {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
