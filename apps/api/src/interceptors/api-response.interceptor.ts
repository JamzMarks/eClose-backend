// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   HttpException,
// } from '@nestjs/common';
// import { Observable, catchError, map, throwError } from 'rxjs';


// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
//   intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
//     return next.handle().pipe(
//       map(data => {
//         console.log(data)
//         // Se a resposta já tem a estrutura ApiResponse, retorna direto
//         if (
//           data &&
//           typeof data === 'object' &&
//           'success' in data &&
//           typeof data.success === 'boolean'
//         ) {
//           return data as ApiResponse<T>;
//         }
//         // Caso contrário, encapsula no padrão
//         return {
//           success: true,
//           data,
//         }}),
//       catchError(err => {
//         const response = {
//           success: false,
//           message: err.message || 'Internal Server Error',
//           errors: err.response || null,
//         };
//         return throwError(() => new HttpException(response, err.status || 500));
//       }),
//     );
//   }
// }
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interface/api.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          ('data' in data || 'message' in data)
        ) {
          return data as ApiResponse<T>;
        }

        return {
          success: true,
          data,
        };
      }),
    );
  }
}
