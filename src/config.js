import dotenv from 'dotenv'
import program from './utils/commander.js'

const { port, database } = program.opts()

dotenv.config(
    {
        path: '.env',
        // program.opts().mode === 'stage' ? '.env.stage' : '.env.development'
    }
)

export default {
    database,
    port,
    mongo_uri: process.env.MONGO_URI,
    mongo_secret: process.env.MONGO_SECRET,
    passport_strategies: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        github: {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        },
        jwt: process.env.JWT_SECRET
    },
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
}
