import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseFilters } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Response } from 'express';
import envConfig from 'src/utils/config';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(body)
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      domain: envConfig.DOMAIN
    })
    return res.send({
      accessToken,
      refreshToken
    });
  }
  @Get(':id')
  async findUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.authService.findOne(id)
  }
}
