import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';

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

    try {
      return await this.dbPrisma.user.create({
        data: { ...createUser, password, sectorId: sectorFound.id },
      });
    } catch (_err) {
      if (
        _err instanceof Prisma.PrismaClientKnownRequestError &&
        _err.code === 'P2002'
      ) {
        throw new ConflictException('This email is already registered.');
      }

      throw _err;
    }
  }

  async find(req) {
    const userId = req.user.id;
    return await this.dbPrisma.user.findFirst({
      where: { id: userId },
      select: { id: true, name: true, email: true, sector: true },
    });
  }

  //Rota esta sendo usada no authguard
  async findOne(id: number) {
    return await this.dbPrisma.user.findFirst({ where: { id } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // } //Implementação futura, oportunidade de update numa versão 2.0 do connectHub
}
