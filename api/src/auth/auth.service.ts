import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  signJwt(input: { [key: string]: string }): string {
    return this.jwtService.sign({ payload: input });
  }
  verifyJwt(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return false;
    }
  }
}
