import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly dbPrisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto, req) {
    const { sector, ...createTicket } = createTicketDto;

    const sectorFound = await this.dbPrisma.sector.findUnique({
      where: { name: sector },
      select: { id: true },
    });

    if (!sectorFound) {
      throw new NotFoundException('Enter a valid sector');
    }

    const { id } = sectorFound;

    return await this.dbPrisma.ticket.create({
      data: { ...createTicket, sectorId: id, creatorId: req.user.id },
    });
  }

  //
  //

  async find(req) {
    const find = await this.dbPrisma.ticket.findMany({
      where: { sectorId: req.user.sectorId },
    });

    return find;
  }

  //
  //

  async findUserCreator(req) {
    const find = await this.dbPrisma.ticket.findMany({
      where: { creatorId: req.user.id },
    });

    return find;
  }

  //
  //

  async update(id: number, updateTicketDto: UpdateTicketDto, req) {
    const userId = req.user.id;
    const userSector = req.user.sectorId;

    const ticket = await this.dbPrisma.ticket.findFirst({
      where: { id, sectorId: userSector.sectorId },
    });

    if (!ticket) {
      throw new NotFoundException('The ticket could not be found.');
    }

    if (userId != ticket.creatorId) {
      // O usuario que n seja o criador do ticket, só pode alterar o status para inProgress ou carriedOut
      const { status } = updateTicketDto;
      const { descriptionConclusion } = updateTicketDto;
      if (
        (status != 'inProgress' && status != 'carriedOut') ||
        descriptionConclusion
      ) {
        throw new UnauthorizedException(
          'You do not have permission to make this change.',
        );
      }
    }

    if (
      updateTicketDto.status == 'finalizationApproved' &&
      updateTicketDto.descriptionConclusion == null
    ) {
      throw new BadRequestException('The descriptionConclusion not none');
    }

    await this.dbPrisma.ticket.update({
      where: { id },
      data: { ...updateTicketDto },
    });

    return 'Update successful.';
  }
}
