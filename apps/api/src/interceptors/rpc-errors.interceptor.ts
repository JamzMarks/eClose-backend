import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../interface/api.interface';

@Injectable()
export class RpcErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse> {
    return next.handle().pipe(
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Erro interno no servidor.';

        // Trata erro de validação do ValidationPipe
        if (error instanceof BadRequestException) {
          const response = error.getResponse() as any;
          return throwError(() =>
            new HttpException(
              {
                success: false,
                message: 'Erro de validação',
                errors: response.message || response,
              },
              error.getStatus(),
            ),
          );
        }

        // Trata erro de handler ausente
        if (
          typeof error?.message === 'string' &&
          (error.message.includes('no matching message handler') ||
            error.message.includes('No message handler'))
        ) {
          status = HttpStatus.SERVICE_UNAVAILABLE;
          message = 'Serviço remoto indisponível ou operação não suportada.';
        } else if (error?.status && typeof error.status === 'number') {
          status = error.status;
          message = error.message || message;
        } else if (error?.message) {
          message = error.message;
        }

        const response: ApiResponse = {
          success: false,
          message,
          errors: error,
        };

        return throwError(() => new HttpException(response, status));
      }),
    );
  }
}
