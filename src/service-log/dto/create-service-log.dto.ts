import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServiceLogDto {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  description: string;

  @IsNumber()
  ticketId: number;
}

// model ServiceLog {
//   id          Int      @id @default(autoincrement())
//   description String
//   ticketId    Int
//   userId      Int
//   createdAt   DateTime @default(now())
//   //
//   ticket      Ticket   @relation(fields: [ticketId], references: [id])
//   user        User     @relation(fields: [userId], references: [id])
// }
