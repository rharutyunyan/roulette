import { Test } from '@nestjs/testing';
import { RmqService } from '@roulette/common/lib/services/rabbitmq';
import { RmqClientModule } from '@roulette/common/lib/services/rabbitmq';
import { RmqSubscriberServiceToken } from '@roulette/common/lib/constants';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { RandomNumberRepository } from '../repositories';

const FAKE_RANDOM_NUMBER_RESPONSE = {
  id: 5,
  randomNumber: 5,
};

const FAKE_RANDOM_NUMBER = FAKE_RANDOM_NUMBER_RESPONSE.randomNumber;

export class FakeRandomNumberRepo {
  public create(): void {}
  public async save(): Promise<void> {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
}

describe('AppController', () => {
  let appController: AppController;
  let rabbitMqService: RmqService;
  let appService: AppService;
  let randomNumberRepository: RandomNumberRepository;
  const mockRabbitMQConnection = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [RmqClientModule],
      controllers: [AppController],
      providers: [RmqClientModule, AppService, RandomNumberRepository],
    })
      .overrideProvider(RmqSubscriberServiceToken)
      .useValue(mockRabbitMQConnection)
      .overrideProvider(RandomNumberRepository)
      .useClass(FakeRandomNumberRepo)
      .compile();

    rabbitMqService = module.get<RmqService>(RmqService);
    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    randomNumberRepository = module.get<RandomNumberRepository>(RandomNumberRepository);
  });

  describe('storeRandomNumber', () => {
    it('should return random number object with id and random number', async () => {
      // tslint:disable-next-line:max-line-length
      jest
        .spyOn(rabbitMqService, 'send')
        .mockImplementation(() => Promise.resolve(FAKE_RANDOM_NUMBER_RESPONSE.randomNumber));
      // tslint:disable-next-line:no-shadowed-variable max-line-length
      jest
        .spyOn(appService, 'storeRandomNumber')
        .mockImplementation(FAKE_RANDOM_NUMBER => Promise.resolve(FAKE_RANDOM_NUMBER_RESPONSE));
      // assuming you would have some findAll function in your rabbitMqService service
      expect(await appController.storeRandomNumber()).toBe(FAKE_RANDOM_NUMBER_RESPONSE);
    });
  });
});
