import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean {
    const req = this.getRequest(context);
    const token = req.cookies['token'];
    const payload = this.authService.verifyAuthToken(token);
    req.user = typeof payload === 'string' ? { email: payload } : payload;
    return true;
  }
}
