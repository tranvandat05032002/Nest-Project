// import fs from 'fs'
// import path from 'path'
import z from 'zod'
// const checkEnv = async () => {
//     const chalk = (await import('chalk')).default
//     if (!fs.existsSync(path.resolve('.env'))) {
//         console.log(chalk.red(`Không tìm thấy file môi trường .env`))
//         process.exit(1)
//     }
// }
// checkEnv()

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
const configServer = configSchema.safeParse(process.env)
if (!configServer.success) {
    console.error(configServer.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}
const envConfig = configServer.data
export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`
export default envConfig
