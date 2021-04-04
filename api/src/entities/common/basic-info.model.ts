import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

@ObjectType()
export abstract class BasicInfo {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  phone: string;

  @Field()
  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  address: string;
}
