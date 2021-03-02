import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, OrmModule } from '@roulette/common/lib/database';
import { ServiceConfig } from '@roulette/common/lib/services/config/service.config';
import { Entities } from '@roulette/common/lib/models';
import { RmqClientModule } from '@roulette/common/lib/services/rabbitmq/rmq-client.module';
import { Controllers } from './controllers';
import { Services } from './services';
import { Repositories } from './repositories';

@Module({
  imports: [
    ServiceConfig,
    RmqClientModule,
    DatabaseModule,
    OrmModule,
    TypeOrmModule.forFeature([...Entities, ...Repositories]),
  ],
  controllers: [...Controllers],
  providers: [...Services, ServiceConfig, RmqClientModule],
})
export class ServiceModule implements OnModuleInit {
  constructor(private svcConfig: ServiceConfig) {}

  onModuleInit() {
    this.svcConfig.print();

    if (!this.svcConfig.isValid()) {
      process.exit(1);
    }
  }
}
