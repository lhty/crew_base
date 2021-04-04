import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './dto/user.dto';
import PostgresErrorCode from '../../database/postgresErrorCode.enum';
import { ClientExceptions } from './enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async getUserByField(field: Partial<User>): Promise<User> {
    return await this.userRepository.findOne(field);
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(
        error.code === PostgresErrorCode.UniqueViolation
          ? ClientExceptions.ALREADY_EXISTS
          : error.message,
        error.status,
      );
    }
  }
}
