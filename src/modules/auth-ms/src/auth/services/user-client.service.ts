import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClientService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy
  ) {}

  async findUserByEmail(email: string) {
    return await firstValueFrom(
      this.client.send({ cmd: 'find-user-by-email' }, email)
    );
  }

  async createUser(user: any) {
    return await firstValueFrom(
      this.client.send({ cmd: 'create-user' }, user)
    );
  }
}