import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilterToHttp implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('Caught RpcException:', exception);
    const error = exception.getError();

    // Garante que está pegando o código e mensagem certos
    const statusCode =
      typeof error === 'object' && error !== null && 'statusCode' in error
        ? (error as any).statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as any).message
        : 'Internal server error';

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}

