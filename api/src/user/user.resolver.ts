import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard, GqlUserEmail } from '../auth/auth.guard';
import { logInInput, logInOutput } from './dto/logIn.dto';
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

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@GqlUserEmail() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => logInOutput, { name: 'login' })
  async LOGIN(@Args('input') input: logInInput) {
    return this.userService.logIn(input);
  }

  @Mutation(() => User, { name: 'createUser' })
  async CREATEUSER(
    @Args('input', new ValidationPipe()) input: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(input);
  }
}
