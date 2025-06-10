// common/interceptors/rpc-exception.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        const formattedError = {
          statusCode: error.code || 500,
          message: error.message || 'Internal server error',
        };
        return throwError(() => new RpcException(formattedError));
      }),
    );
  }
}
