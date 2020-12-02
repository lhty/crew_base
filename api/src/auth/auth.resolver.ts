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
    const { jwt, user } = await this.authService.logIn(input);
    ctx.res.cookie('token', jwt);
    return { jwt, user };
  }
}
