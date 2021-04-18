import { BeforeInsert, Column, Entity, ManyToMany, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { hash } from 'bcrypt';

import { EntityHelper } from '../../common/helpers/entityHelper';
import { Base } from '../base/base.entity';
import { Contract } from '../contract/contract.entity';

export enum UserRole {
  ADMIN = 'SU',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST',
}

@ObjectType()
@Entity('user')
export class User extends EntityHelper {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

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

  @Field(() => Base, { nullable: true })
  @ManyToMany(() => Base, (base) => base.clients)
  bases: Base[];

  @Field(() => Contract, { nullable: true })
  @OneToOne(() => Contract, (contract) => contract.client)
  contract: Contract;
}
