import { Module } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

import { databaseSettings } from './database-config';

export * from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseSettings,
    }),
  ],
  exports: [TypeOrmModule],
})
class DatabaseModule {}

export { DatabaseModule, InjectDataSource, InjectEntityManager, InjectRepository };
