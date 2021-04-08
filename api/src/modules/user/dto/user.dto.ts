import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsAlpha,
  MinLength,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  @Field()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @IsOptional()
  @Field({ defaultValue: null })
  address?: string;
}
