import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database.module';
import { DatabaseConfig } from './database.config';
import { Entities } from '../models';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: DatabaseConfig) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        ssl: config.ssl,
        entities: Entities,
      }),
      imports: [DatabaseModule],
      inject: [DatabaseConfig],
    }),
  ],
})
export class OrmModule implements OnModuleInit {
  onModuleInit() {}
}
