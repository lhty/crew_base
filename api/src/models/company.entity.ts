import { Entity, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Vessel } from './vessel.entity';
import { BasicInfo } from './common/basic-info.model';

@ObjectType()
@Entity('company')
export class Company extends BasicInfo {
  @Field(() => Vessel, { nullable: true })
  @OneToMany(() => Vessel, (vessel) => vessel.company)
  fleet: Vessel[];
}
