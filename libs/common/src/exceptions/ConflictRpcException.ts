import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class ConflictRpcException extends RpcException {
  constructor(message: string | object = 'Conflict') {
    super({
      statusCode: 409,
      message,
    });
  }
}