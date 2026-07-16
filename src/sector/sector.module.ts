import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SectorController],
  providers: [SectorService],
  imports: [PrismaModule],
})
export class SectorModule {}
