import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateServiceLogDto } from './dto/create-service-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceLogService {
  constructor(private readonly dbPrisma: PrismaService) {}

  async create(createServiceLogDto: CreateServiceLogDto, req) {
    const { ticketId } = createServiceLogDto;
    const userSectorId = req.user.sectorId;
    const userId = req.user.id;

    const ticket = await this.dbPrisma.ticket.findFirst({
      where: { id: ticketId },
      select: { sectorId: true },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const { sectorId } = ticket;

    if (sectorId != userSectorId) {
      throw new UnauthorizedException(
        'You dont have permission to make this change.',
      );
    }

    return await this.dbPrisma.serviceLog.create({
      data: { ...createServiceLogDto, userId },
    });
  }

  async find(id: number, req) {
    const userSectorId = req.user.sectorId;
    const userId = req.user.id;

    const ticket = await this.dbPrisma.ticket.findFirst({ where: { id } });

    if (ticket.sectorId != userSectorId && userId != ticket.creatorId) {
      throw new UnauthorizedException(
        'You do not have permission to make this change.',
      );
    }
    console.log(
      'teste',
      await this.dbPrisma.serviceLog.findMany({
        where: { ticketId: id },
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      }),
    );

    return await this.dbPrisma.serviceLog.findMany({
      where: { ticketId: id },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    });
  }
}
