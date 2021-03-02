import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ServiceConfig } from '../config/service.config';
import { RmqSubscriberServiceToken } from '../../constants/token.constant';
import { ConfigModule } from '../config/config.module';
import { RmqService } from './rmq.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RmqSubscriberServiceToken,
        useFactory: (config: ServiceConfig) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${config.rabbitmq.User}:${config.rabbitmq.Password}@${config.rabbitmq.Host}`,
            ],
            queue: config.rabbitmq.QueueName,
            queueOptions: {
              durable: true,
            },
          },
        }),
        imports: [ConfigModule],
        inject: [ServiceConfig],
      },
    ]),
    ConfigModule,
  ],
  providers: [ServiceConfig, RmqService],
  exports: [RmqService],
})
export class RmqClientModule {}
