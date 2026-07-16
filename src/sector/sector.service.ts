import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly dbPrisma: PrismaService) {}
  // create(createSectorDto: CreateSectorDto) {
  //   return 'This action adds a new sector';
  // }
  async findAll() {
    return await this.dbPrisma.sector.findMany();
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} sector`;
  // }
  // update(id: number, updateSectorDto: UpdateSectorDto) {
  //   return `This action updates a #${id} sector`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} sector`;
  // }
}
