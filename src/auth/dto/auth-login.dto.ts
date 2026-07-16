import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
