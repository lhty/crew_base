import { Column, Entity, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Vessel } from './vessel.entity';
import { EntityHelper } from '../../common/helpers/entityHelper';

@ObjectType()
@Entity('company')
export class Company extends EntityHelper {
  @Field()
  @Column()
  name: string;

  @Field(() => Vessel, { nullable: true })
  @OneToMany(() => Vessel, (vessel) => vessel.company)
  fleet: Vessel[];
}
