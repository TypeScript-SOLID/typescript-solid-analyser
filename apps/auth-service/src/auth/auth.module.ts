import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from '@tssa/common';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule, HttpModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
