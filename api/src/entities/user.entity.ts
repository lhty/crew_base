import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user',
  GUEST = 'guest',
}

@ObjectType()
@Entity('user')
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashPassword: string;

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;
}
