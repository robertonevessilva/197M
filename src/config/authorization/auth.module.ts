import { Module } from '@nestjs/common';
import { ApiKeyAuthGuard } from './api-key-auth.guard';

@Module({
  providers: [ApiKeyAuthGuard],
  exports: [ApiKeyAuthGuard],
})
export class AuthModule {}
