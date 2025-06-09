import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class BadRequestRpcException extends RpcException {
  constructor(message: string | object = 'Bad Request') {
    super({
      statusCode: 400,
      message,
    });
  }
}