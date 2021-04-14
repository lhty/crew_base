import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Contract } from './contract.entity';
import { Company } from './company.entity';

@ObjectType()
@Entity('vessel')
export class Vessel {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

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
