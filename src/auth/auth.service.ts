import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly dbPrisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  createToken(user: User) {
    return {
      accessToken: this.JWTService.sign(
        { id: user.id, name: user.name },
        { subject: String(user.id) },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token);

      return data;
    } catch (_err) {
      throw new BadRequestException(_err);
    }
  }

  async login(body: AuthLoginDto) {
    const { email, password } = body;

    const user = await this.dbPrisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    return this.createToken(user);
  }

  async forget(body: AuthForgetDto) {
    const { email } = body;

    const user = await this.dbPrisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email.');
    }

    const token = this.JWTService.sign(
      {
        id: user.id,
      },
      { subject: String(user.id) },
    );

    await this.resend.emails.send({
      from: 'Connect Hub <onboarding@resend.dev>',
      to: user.email,
      subject: 'Password recovery',
      html: `
        <h2>Hy, ${user.name}</h2>

        <p>We received a request to reset your password.
          <br>
          Copy and paste the token below into the password reset, next to the token, enter your new password on the ConnectHub password reset page
        </p>

        <p>${token}</p>
      `,
    });

    return true;
  }

  async reset(body: AuthResetDto) {
    // eslint-disable-next-line prefer-const
    let { password, token } = body;

    try {
      const data = this.JWTService.verify(token);

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Invalid token.');
      }

      password = await bcrypt.hash(password, await bcrypt.genSalt());

      //TO DO: Validar o token
      const user = await this.dbPrisma.user.update({
        where: { id: Number(data.id) },
        data: {
          password,
        },
      });

      return this.createToken(user);
    } catch (_err) {
      throw new BadRequestException(_err);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
