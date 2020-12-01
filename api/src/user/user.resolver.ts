import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserInput } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('user')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async USERS(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async USER(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async CREATEUSER(
    @Args('input', new ValidationPipe()) input: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(input);
  }
}
