import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
function validateRequest(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: any,
): boolean | Promise<boolean> | Observable<boolean> {
  return true;
}
