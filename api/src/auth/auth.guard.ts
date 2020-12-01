import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Unauthorized.');
    }
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required.`);
    }
    const { payload } = this.authService.verifyJwt(token);

    if (!payload) throw new UnauthorizedException('Token not valid');

    req.user = typeof payload === 'string' ? { email: payload } : payload;

    return true;
  }
}
