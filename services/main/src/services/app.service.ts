import { Injectable } from '@nestjs/common';
import { RandomNumber } from '@roulette/common/lib/models';
import { RandomNumberRepository } from '../repositories';

@Injectable()
export class AppService {
  constructor(private readonly randomNumberRepository: RandomNumberRepository) {}
  async storeRandomNumber(rdmNumber: number): Promise<any> {
    const newRandomNumber = new RandomNumber();
    newRandomNumber.randomNumber = rdmNumber;
    return this.randomNumberRepository.save(newRandomNumber);
  }
}
