import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class JwtAuthRpcInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'rpc') {
      const ctx = context.switchToRpc().getContext<RmqContext>();
      const data = context.switchToRpc().getData();

      // Tenta pegar metadata dos headers da mensagem
      const headers = ctx.getArgByIndex(1)?.properties?.headers;
      const authHeader = headers?.authorization || headers?.Authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException('Token not provided');
      }

      const [, token] = authHeader.split(' ');

      try {
        const decoded = this.jwtService.verify(token);
        (data as any).user = decoded;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    return next.handle();
  }
}
