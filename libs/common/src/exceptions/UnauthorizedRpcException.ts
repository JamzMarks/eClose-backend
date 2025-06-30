import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class UnauthorizedRpcException extends RpcException {
  constructor(message: string | object = 'Unauthorized') {
    super({
      statusCode: 401,
      message,
    });
  }
}