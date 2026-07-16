import {
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(500)
  description: string;

  @IsString()
  sector: string;
}

// model Ticket {
//   id                    Int          @id @default(autoincrement())
//   title                 String
//   description           String
//   creatorId             Int
//   sectorId              Int
//   status                TicketStatus
//   descriptionConclusion String?
//   createdAt             DateTime     @default(now())
//   updatedAt             DateTime     @updatedAt
//   //
//   creator               User         @relation(fields: [creatorId], references: [id])
//   sector                Sector       @relation(fields: [sectorId], references: [id])
//   serviceLogs           ServiceLog[]
// }
