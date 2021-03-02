import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { ServiceConfig } from '@roulette/common/lib/services/config/service.config';
import { ServiceModule } from './service.module';

async function bootstrap() {
  const logger: Logger = new Logger('random-number-generator');
  const config: ServiceConfig = new ServiceConfig();
  const rmqUser = config.rabbitmq.User;
  const rmqPassword = config.rabbitmq.Password;
  const rmqHost = config.rabbitmq.Host;
  const rmqQueueName = config.rabbitmq.QueueName;
  const app = await NestFactory.createMicroservice(ServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}`],
      queue: rmqQueueName,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.useLogger(logger);
  app.listen(() => logger.debug('Random Number Generator microservice is listening'));
}
bootstrap();
