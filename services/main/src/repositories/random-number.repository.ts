import { EntityRepository, Repository } from 'typeorm';

import { RandomNumber } from '@roulette/common/lib/models';

@EntityRepository(RandomNumber)
export class RandomNumberRepository extends Repository<RandomNumber> {}
