import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import envConfig from 'src/utils/config';

export interface TokenType {
    accessToken: string;
    refreshToken: string;
}
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(userData: RegisterDto): Promise<User> {
        // Kiểm tra email đã tồn tại trong database chưa
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userData.email
            }
        });
        if (user) {
            throw new HttpException(
                {
                    message: 'This email has been used.'
                },
                HttpStatus.BAD_REQUEST
            );
        }
        // mã hóa password và lưu vào trong database
        const hashPassword = await hash(userData.password, 10);
        const res = await this.prismaService.user.create({
            data: {
                ...userData,
                password: hashPassword
            }
        });

        return res;
    }

    async login(data: { email: string; password: string }): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new HttpException(
                {
                    message: 'Account is not exist.'
                },
                HttpStatus.BAD_REQUEST
            );
        }
        const verify = await compare(data.password, user.password);
        if (!verify) {
            throw new HttpException(
                {
                    message: 'Password does not correct.'
                },
                HttpStatus.UNAUTHORIZED
            );
        }

        const payload = { id: user.id, name: user.name, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: envConfig.ACCESS_TOKEN_SECRET_KEY,
            expiresIn: '7m'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: envConfig.REFRESH_TOKEN_SECRET_KEY,
            expiresIn: '7d'
        });

        return {
            accessToken,
            refreshToken
        };
    }
}
