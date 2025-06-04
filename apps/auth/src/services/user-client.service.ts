import { UserCommands } from '@app/common/constants/user.commands';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClientService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy
  ) {}

  async findUserByEmail(email: string) {
    console.log('Finding user by email:', email);
    return await firstValueFrom(
      this.client.send({ cmd: UserCommands.FIND_BY_EMAIL }, email)
    );
  }

  async createUser(user: any) {
    return await firstValueFrom(
      this.client.send({ cmd: UserCommands.CREATE }, user)
    );
  }

  async findUserByEmailWithPassword(email: string) {
    return await firstValueFrom(
      this.client.send({ cmd: UserCommands.FIND_BY_EMAIL_WITH_PASSWORD }, email)
    );
  }
}