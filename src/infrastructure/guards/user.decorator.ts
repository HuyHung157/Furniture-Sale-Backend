import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CommonConstants } from '../constants/common.constants';
import { UserAccount } from './user-account.class';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const arg = ctx.getArgByIndex(CommonConstants.GQL_EXECUTION_CONTEXT_REQ_INDEX);
    return new UserAccount(arg.req.user);
  },
);
