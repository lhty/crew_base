import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CreateUserInput } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'AllUsers' })
  async USERS() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async USER(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { name: 'createClient' })
  async CREATE_CLIENT(
    @Args('input', new ValidationPipe()) input: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(input);
  }
}
