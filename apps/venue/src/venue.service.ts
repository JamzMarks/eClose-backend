import { Injectable } from '@nestjs/common';

@Injectable()
export class VenueService {
  getHello(): string {
    return 'Hello World!';
  }
}
