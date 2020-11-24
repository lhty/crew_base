import {
  BadRequestException,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async getRequest(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = await this.getRequest(context);

    if (!req.headers.authorization) {
      throw new UnauthorizedException('Unauthorized.');
    }
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required.`);
    }
    const { payload } = this.authService.verifyJwt(token);

    if (!payload) throw new UnauthorizedException('Token not valid');

    req.email = payload;
    return true;
  }
}

export const GqlUserEmail = createParamDecorator(
  (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.email;
  },
);
