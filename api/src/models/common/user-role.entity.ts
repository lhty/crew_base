import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

export enum UserRoleType {
  ADMIN = 'SU',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST',
}

@ObjectType()
export class UserType {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.GUEST,
  })
  type: UserRoleType;
}
