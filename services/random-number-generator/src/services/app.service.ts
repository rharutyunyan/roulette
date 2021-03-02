import { Injectable } from '@nestjs/common';
import randomInt from 'random-int';

@Injectable()
export class AppService {
  getRandomNumber(): number {
    return randomInt(1, 10000000);
  }
}
