import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('forget') //recuperação de senha
  async forget(@Body() body: AuthForgetDto) {
    return this.authService.forget(body);
  }

  @Post('reset') //resetar a senha após passar pela recuperação de senha
  async reset(@Body() body: AuthResetDto) {
    return this.authService.reset(body);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    return { data: req.tokenPayload, user: req.user };
  }
}
