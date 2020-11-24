import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/user.dto';
import { hash, verify } from 'argon2';
import { logInInput, logInOutput } from './dto/logIn.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne(id);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    user.role = UserRole.GUEST;
    user.hashPassword = await hash(input.password);
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(
        error.code === '23505' ? 'Email already exists.' : error.message,
        error.status,
      );
    }
  }

  async logIn({ email, password }: logInInput): Promise<logInOutput> {
    try {
      const user = await this.getUserByEmail(email);

      if (!user || !(await verify(user.hashPassword, password)))
        throw new Error('Wrong email or password.');

      return {
        user,
        jwt: this.authService.signJwt({ email: user.email }),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
