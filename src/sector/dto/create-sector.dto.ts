import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}

// model Sector {
//   id             Int      @id @default(autoincrement())
//   name           String   @unique
//   sectorEmployee User[]
//   tickets        Ticket[]
// }
