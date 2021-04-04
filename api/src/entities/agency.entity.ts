import { Entity, Column, JoinTable, OneToOne, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Base } from './base.entity';
import { BasicInfo } from './common/basic-info.model';
import { Contract } from './contract.entity';

@ObjectType()
@Entity('agency')
export class Agency extends BasicInfo {
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
