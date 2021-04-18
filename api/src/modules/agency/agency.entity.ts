import { Entity, Column, JoinTable, OneToOne, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { EntityHelper } from '../../common/helpers/entityHelper';
import { Base } from '../base/base.entity';
import { Contract } from '../contract/contract.entity';

@ObjectType()
@Entity('agency')
export class Agency extends EntityHelper {
  @Field()
  @Column()
  name: string;

  @Field(() => [Contract])
  @ManyToOne(() => Contract, (contract) => contract.agency)
  @JoinTable()
  contracts: Contract[];

  @Field(() => Base)
  @OneToOne(() => Base, (base) => base.agency)
  base: Base;
}
