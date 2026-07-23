import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly dbPrisma: PrismaService) {}

  async findAll() {
    return await this.dbPrisma.sector.findMany();
  }
}
