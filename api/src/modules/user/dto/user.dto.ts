import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: null })
  address?: string;
}
