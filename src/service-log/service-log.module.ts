import { Module } from '@nestjs/common';
import { ServiceLogService } from './service-log.service';
import { ServiceLogController } from './service-log.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ServiceLogController],
  providers: [ServiceLogService],
  imports: [PrismaModule, UserModule, AuthModule],
})
export class ServiceLogModule {}
