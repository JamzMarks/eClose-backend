import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class InternalServerRpcException extends RpcException {
  constructor(message: string | object = 'Internal Server Error') {
    super({
      statusCode: 500,
      message,
    });
  }
}