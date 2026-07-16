import { TicketStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsEnum(TicketStatus)
  @IsString()
  status: TicketStatus;

  @IsOptional()
  @IsString()
  descriptionConclusion: string;
}
