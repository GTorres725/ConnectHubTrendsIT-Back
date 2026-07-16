import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dbPrisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line prefer-const
    let { sector, password, ...createUser } = createUserDto;

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    const sectorFound = await this.dbPrisma.sector.findUnique({
      where: { name: sector },
      select: { id: true },
    });

    if (!sectorFound) {
      throw new NotFoundException('Enter a valid sector');
    }

    return await this.dbPrisma.user.create({
      data: { ...createUser, password, sectorId: sectorFound.id },
    });
  } //TO DO: err unique do prisma no email esta estourando 500

  async find(req) {
    const userId = req.user.id;
    return await this.dbPrisma.user.findFirst({
      where: { id: userId },
      select: { id: true, name: true, email: true, sector: true },
    });
  }

  //Rota esta sendo usada n authguard
  async findOne(id: number) {
    return await this.dbPrisma.user.findFirst({ where: { id } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
