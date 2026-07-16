import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SectorModule } from './sector/sector.module';
import { TicketModule } from './ticket/ticket.module';
import { ServiceLogModule } from './service-log/service-log.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    SectorModule,
    TicketModule,
    ServiceLogModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
