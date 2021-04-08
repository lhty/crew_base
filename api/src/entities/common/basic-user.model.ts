import { BeforeInsert, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BasicInfo } from './basic-info.model';
import { hash } from 'bcrypt';

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
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;
}
