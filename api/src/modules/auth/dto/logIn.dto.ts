import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../user/user.entity';

@InputType()
export class logInInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

@ObjectType()
export class logInOutput {
  @Field()
  user: User;

  @Field()
  jwt: string;
}
