import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // No required roles or Guest, are Public
    if (!requiredRoles || requiredRoles.includes(Role.Guest)) {
      return true;
    }
    // Getting the token
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      return false;
    }
    // Decoding the token
    const payload = this.jwtService.decode(token);
    if (typeof payload === 'string') {
      return false;
    }
    // User.roles: Array > Object > String.
    // Transforming both objects into arrays with only strings for matching.
    // const userRoles = payload.roles.map((role) => role.enum);
    // const rolesUser = Object.values(payload.roles);
    const rolesUser = payload.roles.map((role) => role.enum);
    const rolesRequired = Object.values(requiredRoles);
    // Does user.roles contain at least one role required?
    if (rolesRequired.some((role) => rolesUser.includes(role))) {
      return true;
    }
    // Not allowed.
    return false;
  }
}
