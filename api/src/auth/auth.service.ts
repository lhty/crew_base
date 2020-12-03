import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { logInInput } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  verifyAuthToken(token: string): string {
    if (!token) {
      throw new UnauthorizedException('Unauthorized.');
    }
    try {
      const { payload } = this.jwtService.verify(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Token not valid');
    }
  }

  async getUserByFields(user: Partial<User>) {
    return await this.userRepository.findOne(user);
  }

  async logIn({ email, password }: logInInput): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user || !(await verify(user.hashPassword, password)))
        throw new Error('Wrong email or password.');
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
