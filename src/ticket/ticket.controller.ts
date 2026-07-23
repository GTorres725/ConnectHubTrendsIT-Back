import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req) {
    return this.ticketService.create(createTicketDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  find(@Req() req, @Query('date') date?: string) {
    return this.ticketService.find(req, date);
  }

  @UseGuards(AuthGuard)
  @Get('myTickets')
  findUserCreator(@Req() req, @Query('date') date?: string) {
    return this.ticketService.findUserCreator(req, date);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    // @Param('userId', ParseIntPipe) userId: number,
    @Body() updateTicketDto: UpdateTicketDto,
    @Req() req,
  ) {
    return this.ticketService.update(id, updateTicketDto, req);
  }
}
