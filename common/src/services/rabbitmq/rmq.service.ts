import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RmqSubscriberServiceToken } from '../../constants/token.constant';

@Injectable()
export class RmqService {
  constructor(@Inject(RmqSubscriberServiceToken) private readonly client: ClientProxy) {}

  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
