import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    // Ideally here you'd authenticate the user agains an OIDC server like keycloak
    if (!authorizationHeader) throw new UnauthorizedException();

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    return roles.some((r) => r === authorizationHeader);
  }
}
