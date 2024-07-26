import z from 'zod'
const configSchema = z.object({
    PORT: z.coerce.number().default(8000),
    DATABASE_URL: z.string(),
    ACCESS_TOKEN_SECRET_KEY: z.string(),
    ACCESS_TOKEN_EXPIRES_ID: z.string(),
    REFRESH_TOKEN_SECRET_KEY: z.string(),
    REFRESH_TOKEN_EXPIRES_ID: z.string(),
    DOMAIN: z.string(),
    PROTOCOL: z.string(),
})
const configServer = configSchema.safeParse({
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_ID: process.env.ACCESS_TOKEN_EXPIRES_ID,
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES_ID: process.env.REFRESH_TOKEN_EXPIRES_ID,
    DOMAIN: process.env.DOMAIN,
    PROTOCOL: process.env.PROTOCOL
})
if (!configServer.success) {
    const errorDetails = configServer.error.issues
    errorDetails.forEach((issue) => {
        console.log(`Key: ${issue.path[0]}, Error: ${issue.message}`)
        throw new Error(`Key: ${issue.path[0]}, Error: ${issue.message} ---> KEY không hợp lệ hoặc 
                        không tồn tại`)
    })
}
const envConfig = configServer.data
export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`
export default envConfig
