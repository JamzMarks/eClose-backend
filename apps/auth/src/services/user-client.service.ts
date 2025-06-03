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
      this.client.send({ cmd: 'find_users_by_email' }, email)
    );
  }

  async createUser(user: any) {
    return await firstValueFrom(
      this.client.send({ cmd: 'create_user' }, user)
    );
  }

  async findUserByEmailWithPassword(email: string) {
    return await firstValueFrom(
      this.client.send({ cmd: 'find_users_by_email_with_password' }, email)
    );
  }
}