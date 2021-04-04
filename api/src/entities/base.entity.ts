import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Agency } from './agency.entity';
import { User } from './user.entity';

@ObjectType()
@Entity('base')
export class Base {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

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
