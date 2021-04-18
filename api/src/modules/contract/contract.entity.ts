import { Entity, ManyToOne, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { EntityHelper } from '../../common/helpers/entityHelper';
import { Agency } from '../agency/agency.entity';
import { Vessel } from '../company/vessel.entity';
import { User } from '../user/user.entity';

export enum ContractStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
@ObjectType()
@Entity('contract')
export class Contract extends EntityHelper {
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
