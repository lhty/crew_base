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

  getHeadersAuthToken(context: ExecutionContext): any {
    const request = this.getRequest(context);

    if (!request.headers.authorization) {
      throw new UnauthorizedException('Unauthorized.');
    }
    const [type, token] = request.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required.`);
    }
    const { payload } = this.authService.verifyJwt(token);

    if (!payload) throw new UnauthorizedException('Token not valid');

    return [payload, request];
  }

  getCookieAuthToken(context: ExecutionContext): any {
    const request = this.getRequest(context);
    const token = request.cookies['token'];

    if (!token) {
      throw new UnauthorizedException('Unauthorized.');
    }

    const { payload } = this.authService.verifyJwt(token);

    if (!payload) throw new UnauthorizedException('Token not valid');

    return [payload, request];
  }

  canActivate(context: ExecutionContext): boolean {
    const [payload, request] = this.getCookieAuthToken(context);
    // const [payload, request] = this.getHeadersAuthToken(context);
    request.user = typeof payload === 'string' ? { email: payload } : payload;

    return true;
  }
}
