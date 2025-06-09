import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { ApiResponse } from '../interface/api.interface';

@Catch(RpcException)
export class RpcExceptionFilterToHttp implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log('caiu no RpcException')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.getError();

    const statusCode =
      typeof error === 'object' && error !== null && 'statusCode' in error
        ? (error as any).statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as any).message
        : 'Internal server error';

    response.status(statusCode).json({
      message,
      errors: error,
    });
  }
}


