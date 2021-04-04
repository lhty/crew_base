import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Agency } from './agency.entity';
import { Vessel } from './vessel.entity';
import { User } from './user.entity';

export enum ContractStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
@ObjectType()
@Entity('contract')
export class Contract {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Agency)
  @ManyToOne(() => Agency, (agency) => agency.contracts)
  agency: Agency;

  @Field(() => Vessel)
  @ManyToOne(() => Vessel, (vessel) => vessel.contracts)
  vessel: Vessel;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  client: User;

  @Field()
  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.PENDING,
  })
  status: ContractStatus;
}
