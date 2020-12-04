import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { logInInput, logInOutput } from '../../dto/logIn.dto';
import { GqlGetCurrentUser } from './auth.decorators';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Query(() => User, { name: 'whoAmI' })
  @UseGuards(GqlAuthGuard)
  async ME(@GqlGetCurrentUser() user: Partial<User>) {
    return this.authService.getUserByFields(user);
  }

  @Mutation(() => logInOutput, { name: 'login' })
  async LOGIN(@Context() ctx: any, @Args('input') input: logInInput) {
    const user = await this.authService.logIn(input);
    const jwt = this.jwtService.sign({ email: user.email });
    ctx.res.cookie('token', jwt);
    return { jwt, user };
  }
}
