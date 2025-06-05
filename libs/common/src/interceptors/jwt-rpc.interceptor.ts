// libs/common/src/interceptors/jwt-rpc.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthRpcInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToRpc();
    const data = ctx.getData();

    const token = data?.accessToken || data?.Authorization || data?.authorization;

    if (!token) {
      throw new RpcException(new UnauthorizedException('Token not provided'));
    }

    try {
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));
      // Injeta o payload do usuário no contexto (para RolesGuard, etc.)
      ctx.getContext().user = payload;
    } catch (err) {
      throw new RpcException(new UnauthorizedException('Invalid or expired token'));
    }

    return next.handle();
  }
}
