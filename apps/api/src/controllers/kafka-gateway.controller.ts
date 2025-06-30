import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class KafkaGatewayController {
  // This controller can be used to handle Kafka-related routes or events
  // Currently, it does not have any specific methods or properties
  // You can add methods to handle specific Kafka topics or events as needed
  @EventPattern('health_checked')
  handleHealthCheck(@Payload() message: any) {
    console.log('[LoggerService] 🔔 Health check recebido:', message.value?.toString());
  }
}