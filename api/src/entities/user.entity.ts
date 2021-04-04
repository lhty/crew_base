import { Entity, ManyToMany, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Contract } from './contract.entity';
import { BasicUser } from './common/basic-user.model';
import { Base } from './base.entity';

@ObjectType()
@Entity('user')
export class User extends BasicUser {
  @Field(() => Base, { nullable: true })
  @ManyToMany(() => Base, (base) => base.clients)
  bases: Base[];

  @Field(() => Contract, { nullable: true })
  @OneToOne(() => Contract, (contract) => contract.client)
  contract: Contract;
}
