import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { logInInput, logInOutput } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
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

  async getUserByFields(user: Partial<User>) {
    return await this.userRepository.findOne(user);
  }

  async logIn({ email, password }: logInInput): Promise<logInOutput> {
    try {
      const user = await this.userRepository.findOne({ email });

      if (!user || !(await verify(user.hashPassword, password)))
        throw new Error('Wrong email or password.');

      return {
        user,
        jwt: this.signJwt({ email: user.email }),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
