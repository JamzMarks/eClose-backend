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
import { ApiResponse, ApiStatus } from '../interface/api.interface';

@Injectable()
export class RpcErrorsInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<unknown>> {
    return next.handle().pipe(
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Erro interno no servidor';
        let errors: any = null;
        // Trata erro de validação (ValidationPipe)
        if (error instanceof BadRequestException) {
          const response = error.getResponse() as any;
          return throwError(() =>
            new HttpException(
              {
                status: ApiStatus.ERROR,
                message: 'Validation error',
                errors: response.message || response,
              },
              error.getStatus(),
            ),
          );
        }
        
        // Trata erro que já vem com statusCode e message (ex: login)
        if (error?.statusCode && error?.message) {
          status = error.statusCode;
          message = typeof error.message === 'string' ? error.message : 'Erro na requisição';
          errors = error.message;
        }

        // Handler ausente (microservice offline ou mal configurado)
        if (
          typeof error?.message === 'string' &&
          (error.message.includes('no matching message handler') ||
            error.message.includes('No message handler'))
        ) {
          status = HttpStatus.SERVICE_UNAVAILABLE;
          message = 'Serviço remoto indisponível ou operação não suportada.';
        }

        // Fallback genérico
        const response: ApiResponse<null> = {
          status: ApiStatus.ERROR,
          message,
          ...(errors && errors !== message ? { errors } : {}),
        };

        return throwError(() => new HttpException(response, status));
      }),
    );
  }
}
