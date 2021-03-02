import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { DatabaseConfig } from './database.config';

@Module({
  imports: [],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  constructor(private config: DatabaseConfig) {}

  onModuleInit() {
    this.config.print();
    if (!this.config.isValid()) {
      process.exit(1);
    }
  }

  onModuleDestroy() {}
}
