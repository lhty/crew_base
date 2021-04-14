import { ExecutionContext, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { logInInput, logInOutput } from './dto/logIn.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AuthService } from './auth.service';
import { User } from '../../models/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'currentUser' })
  @UseGuards(AuthGuard)
  async ME(@Context() ctx: ExecutionContext) {
    return await this.authService.getUserByToken(ctx);
  }

  @Mutation(() => logInOutput, { name: 'login' })
  async LOGIN(
    @Context() ctx: ExecutionContext,
    @Args('input') input: logInInput,
  ) {
    return await this.authService.logIn(input, ctx);
  }
}
