import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logInInput, logInOutput } from './dto/logIn.dto';
import { CacheService } from '../cache/cache.service';
import { AuthExceptions, AuthTokenName } from './enum';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
  ) {}

  async logIn({ email, password }: logInInput, ctx: any): Promise<logInOutput> {
    const user = await this.userService.getUserByField({ email });

    if (!user || !(await compare(password, user.password))) {
      throw new Error(AuthExceptions.INVALID_CREDENTIALS);
    }

    const jwt = this.jwtService.sign({ id: user.id, role: user.role });
    this.setCookieToken(ctx, jwt);

    return { user, jwt };
  }

  async getUserByToken(ctx: any): Promise<User> {
    const token = ctx.req.signedCookies[AuthTokenName];
    if (!token) {
      throw new UnauthorizedException(AuthExceptions.UNAUTHORIZED);
    }

    const { id } = await this.verifyAuthToken(token);
    return await this.userService.getUserByField({ id });
  }

  async verifyAuthToken(token: string) {
    const cached_token = await this.cacheService.get(token);

    if (cached_token) {
      return cached_token;
    }
    try {
      const payload = this.jwtService.verify(token);
      await this.cacheService.set(token, payload);
      return payload;
    } catch {
      throw new UnauthorizedException(AuthExceptions.INVALIDTOKEN);
    }
  }

  setCookieToken(ctx: any, jwt: string): void {
    ctx.res.cookie(AuthTokenName, jwt, {
      maxAge: process.env.COOKIE_EXPIRE,
      httpOnly: true,
      signed: true,
      // secure: true,
      secret: process.env.COOKIE_SECRET,
    });
  }
}
