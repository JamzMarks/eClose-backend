import { Controller, Get } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
  @EventPattern('health_checked')
  handleHealthCheck(@Payload() message: any) {
    console.log('[LoggerService] 🔔 Health check recebido em API:', message.value?.toString());
  }
  
}
