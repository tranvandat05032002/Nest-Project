import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenPayload } from "src/types/jwt.types";

export const UserDecodedAuthorization = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.decoded_authorization
})