import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsOptional, IsAlpha } from 'class-validator';
import { UserRole } from '../user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field({ defaultValue: UserRole.GUEST })
  @IsOptional()
  role?: UserRole;
}
