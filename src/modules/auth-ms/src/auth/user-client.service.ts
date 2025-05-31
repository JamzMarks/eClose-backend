import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClientService {
  private readonly baseUrl = 'http://localhost:3002';
  constructor(private readonly http: HttpService) {}

  async findUserByEmail(email: string) {
    const response = this.http.get(`${this.baseUrl}/users/email/${email}`);
    const res = await firstValueFrom(response);
    return res.data;
  }

  async createUser(user: any) {
    const response$ = this.http.post(`${this.baseUrl}/users`, user);
    const res = await firstValueFrom(response$);
    return res.data;
  }

}