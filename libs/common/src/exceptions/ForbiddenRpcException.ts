import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class ForbiddenRpcException extends RpcException {
  constructor(message: string | object = 'Forbidden') {
    super({
      statusCode: 403,
      message,
    });
  }
}