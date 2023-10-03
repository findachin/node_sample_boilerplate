import dotenv from 'dotenv'

dotenv.config()


const config = {
    googleOAUTH: {
        callbackURL: '/v1/auth/google/callback',
        clientID: process.env.clientID || "",
        clientSecret: process.env.clientSecret || ""
    }
}

export default Object.freeze(config)