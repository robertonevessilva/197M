import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const X_API_KEY = process.env.X_API_KEY || 'x-api-key-secret';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const xApiKey = request.headers['x-api-key'];
    if (!xApiKey) {
      throw new UnauthorizedException('API Key is required');
    }
    if (X_API_KEY !== xApiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}
