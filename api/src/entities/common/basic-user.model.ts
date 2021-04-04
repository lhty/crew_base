import { BeforeInsert, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BasicInfo } from './basic-info.model';
import { IsNotEmpty, IsAlpha, MinLength } from 'class-validator';
import { hash } from 'argon2';

export enum UserRole {
  ADMIN = 'SU',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST',
}

@ObjectType()
export abstract class BasicUser extends BasicInfo {
  @Field()
  @Column()
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  firstName: string;

  @Field()
  @Column()
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  lastName: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;
}
