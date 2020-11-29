import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  signJwt(payload: Partial<User>): string {
    return this.jwtService.sign({ payload });
  }
  verifyJwt(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return false;
    }
  }
}
