import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import config from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config as ConnectionOptions)],
})
export class DatabaseModule {}
