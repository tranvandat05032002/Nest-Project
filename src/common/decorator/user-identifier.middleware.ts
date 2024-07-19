import { Injectable, NestMiddleware } from "@nestjs/common";
import { ParamsDictionary } from 'express-serve-static-core'
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import envConfig from "src/utils/config";
import { TokenPayload } from "src/types/jwt.types";

@Injectable()
export class UserIdentifierMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const decoded = this.jwtService.verify(token, {
                    secret: envConfig.ACCESS_TOKEN_SECRET_KEY,
                    ignoreExpiration: true
                });
                req.decoded_authorization = decoded as TokenPayload
                req['decoded_authorization'] = decoded
            } catch (err) {
                console.log('🐞  UserIdentifierMiddleware  use  err:', err)
            }
        }
        next()
    }
}