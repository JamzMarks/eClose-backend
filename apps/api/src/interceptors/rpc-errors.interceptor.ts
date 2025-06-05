import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class RpcErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error.message.includes('no matching message handler') ||
          error.message.includes('No message handler')
        ) {
          // transforma erro RPC em erro HTTP legível
          return throwError(() => new RpcException('Serviço remoto indisponível ou operação não suportada.'));
        }
        return throwError(() => error);
      }),
    );
  }
}
