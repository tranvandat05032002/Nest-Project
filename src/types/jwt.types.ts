export interface TokenPayload {
    id: number
    name: string
    email: string
    iat: number
    exp: number
}
export interface TokenType {
    accessToken: string
    refreshToken: string
}