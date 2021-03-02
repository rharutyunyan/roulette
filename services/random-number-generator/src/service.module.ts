import { Module, OnModuleInit } from '@nestjs/common';
import { ServiceConfig } from '@roulette/common/lib/services/config/service.config';

import { Controllers } from './controllers';
import { Services } from './services';

@Module({
  imports: [ServiceConfig],
  controllers: [...Controllers],
  providers: [...Services, ServiceConfig],
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
