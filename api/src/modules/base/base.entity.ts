import { Entity, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Agency } from '../agency/agency.entity';
import { User } from '../user/user.entity';
import { EntityHelper } from '../../common/helpers/entityHelper';

@ObjectType()
@Entity('base')
export class Base extends EntityHelper {
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.bases, {
    eager: true,
  })
  @JoinTable()
  clients: User[];

  @Field(() => Agency)
  @OneToOne(() => Agency, (agency) => agency.base)
  agency: Agency;
}
