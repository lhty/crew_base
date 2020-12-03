import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../../ormconfig';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config as ConnectionOptions)],
})
export class DatabaseModule {}
