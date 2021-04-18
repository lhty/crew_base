import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { EntityHelper } from '../../common/helpers/entityHelper';
import { Contract } from '../contract/contract.entity';
import { Company } from './company.entity';

@ObjectType()
@Entity('vessel')
export class Vessel extends EntityHelper {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field(() => Company, { nullable: true })
  @ManyToOne(() => Company, (company) => company.fleet)
  company: Company;

  @Field(() => [Contract], { nullable: true })
  @OneToMany(() => Contract, (contract) => contract.vessel)
  contracts: Contract[];
}
