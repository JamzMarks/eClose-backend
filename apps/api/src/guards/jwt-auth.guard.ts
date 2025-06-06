// auth/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }
    const token = authHeader.split(' ')[1]; // aqui ainda ta quebrando
    if (!token) throw new UnauthorizedException('Token missing');

    try {
      console.log(token)
      const decoded = this.jwtService.verify(token);
      console.log('[AuthGuard] Decoded JWT:', decoded);
      request.user = decoded;
      return true;
    } catch (err) {
      console.error('[AuthGuard] JWT verification failed:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
