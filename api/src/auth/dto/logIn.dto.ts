import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../user/user.entity';

@InputType()
export class logInInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class logInOutput {
  @Field()
  user: User;

  @Field()
  jwt: string;
}
