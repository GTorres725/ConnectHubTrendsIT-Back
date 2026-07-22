import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceLogService } from './service-log.service';
import { CreateServiceLogDto } from './dto/create-service-log.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('service-log')
export class ServiceLogController {
  constructor(private readonly serviceLogService: ServiceLogService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createServiceLogDto: CreateServiceLogDto, @Req() req) {
    return this.serviceLogService.create(createServiceLogDto, req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.serviceLogService.find(id, req);
  }
}
