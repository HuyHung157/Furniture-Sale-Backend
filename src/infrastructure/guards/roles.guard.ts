import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlUtil } from '../utils/gql.utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || !requiredRoles.length) {
      return false;
    }

    const gqlContext = GqlUtil.getGqlContext(context);
    const userRole = gqlContext.req.user?.role || '';
    if (!userRole) {
      return false;
    }

    return requiredRoles.some(role => role.toUpperCase() === userRole.toUpperCase());
  }
}
