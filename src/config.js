import dotenv from 'dotenv'
import program from './utils/commander.js'

dotenv.config(
    {
        path: '.env'
        // program.opts().mode === 'stage' ? '.env.stage' : '.env.development'
    }
)

const obj = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    mongo_secret : process.env.MONGO_SECRET,
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
    }



}

export default obj
