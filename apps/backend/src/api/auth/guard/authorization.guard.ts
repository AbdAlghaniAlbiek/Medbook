import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@repo/db';
import { IsPublicAPI } from './meta/public.meta';
import { Reflector } from '@nestjs/core';

export function AuthorizationGuard(userRoles: UserRole[]) {
  @Injectable()
  class AuthGuardClass implements CanActivate {
    constructor(public reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<Request>();
      const user: User = req['user'];

      const isPublic = this.reflector.get(IsPublicAPI, context.getHandler());
      if (isPublic) {
        return true as any;
      }

      if (!userRoles.includes(user.role)) {
        throw new ForbiddenException(
          `You don't have the permission to do this action`,
        );
      }

      return true;
    }
  }

  return AuthGuardClass;
}
