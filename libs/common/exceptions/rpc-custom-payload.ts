import { RpcExceptionPayload } from '@app/common/interfaces/rpc-exception';
import { RpcException } from '@nestjs/microservices';

export class RpcCustomException extends RpcException {
  constructor(message: string, statusCode: number) {
    super({ message, statusCode } as RpcExceptionPayload);
  }
}