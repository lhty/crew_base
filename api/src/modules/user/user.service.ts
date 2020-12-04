import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../../dto/user.dto';
import { hash } from 'argon2';
import PostgresErrorCode from '../../config/database/postgresErrorCode.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne(id);
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
        error.code === PostgresErrorCode.UniqueViolation
          ? 'User with that email already exists.'
          : error.message,
        error.status,
      );
    }
  }
}
