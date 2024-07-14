import { User } from '@prisma/client'
import { Request } from 'express'
import { TokenPayload } from './types/jwt.types'
declare module 'express' {
    interface Request {
        user?: User,
        decoded_authorization?: TokenPayload
    }
}
