import { IsJWT, IsStrongPassword, MinLength } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @IsJWT()
  token: string;
}
