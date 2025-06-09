import { RpcException } from "@nestjs/microservices/exceptions/rpc-exception";

export class NotFoundRpcException extends RpcException {
  constructor(message: string | object = 'Not Found') {
    super({
      statusCode: 404,
      message,
    });
  }
}