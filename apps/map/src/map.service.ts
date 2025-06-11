import { Injectable } from '@nestjs/common';

@Injectable()
export class MapService {
  async findNearby(
    type: string,
    latNum: number,
    lngNum: number,
    radiusMeters: number,
  ): Promise<any> {
    return 'hello'
    
  }
}
