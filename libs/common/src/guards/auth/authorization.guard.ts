import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('AuthorizationGuard: Checking authorization...');
    return true; // ← isso garante que o Nest vai permitir o acesso
  }
}