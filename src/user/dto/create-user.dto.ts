import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @IsString()
  sector: string;
}

// model User {
//   id          Int          @id @default(autoincrement())
//   name        String
//   email       String
//   password    String
//   sectorId    Int
//   //
//   sector      Sector       @relation(fields: [sectorId], references: [id])
//   tickets     Ticket[]
//   serviceLogs ServiceLog[]
// }
