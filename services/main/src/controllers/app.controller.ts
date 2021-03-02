import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

import { RmqService } from '@roulette/common/src/services/rabbitmq';
import { RmqGenerateRandomNumber } from '@roulette/common/src/constants';
import { AppService } from '../services/app.service';

@Controller('roulette')
export class AppController {
  constructor(private readonly appService: AppService, private readonly rmqClient: RmqService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Create random number' })
  @ApiOperation({ summary: 'Random number is created' })
  async storeRandomNumber(): Promise<any> {
    const randomNumber = await this.rmqClient.send(RmqGenerateRandomNumber, {});
    return this.appService.storeRandomNumber(randomNumber);
  }
}
