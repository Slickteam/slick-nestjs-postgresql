import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
export * from 'typeorm';

import { databaseSettings } from './database-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseSettings,
    }),
  ],
  exports: [TypeOrmModule],
})
class DatabaseModule {}

export { DatabaseModule };
