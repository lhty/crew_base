import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { GqlGetCurrentUser } from './auth.decorators';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { logInInput, logInOutput } from './dto/logIn.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { name: 'whoAmI' })
  @UseGuards(GqlAuthGuard)
  async ME(@GqlGetCurrentUser() user: Partial<User>) {
    return this.authService.getUserByFields(user);
  }

  @Mutation(() => logInOutput, { name: 'login' })
  async LOGIN(@Context() ctx: any, @Args('input') input: logInInput) {
    ctx.res.cookie('some-cookie', 'some-value-test');
    return this.authService.logIn(input);
  }
}
