import express, { static as _static, json } from "express";
import cookieSession from "cookie-session";
import { join } from 'path'
import morgan from "morgan";

import { getFolderPath } from '../src/utils/_utils.js'
import routes from '../src/routes/routes.js'
import passport from "../src/utils/passport.auth.js";

const app = express()
const __dirname = getFolderPath(import.meta.url);

app.use(morgan("combined"))

app.use(json())
app.use(_static(join(__dirname, '..', 'public')))

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['randomKey', 'newRandomKeyForRotation']
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/v1', routes)

app.use('/*', (req, res) => {
    const indexHtml = join(__dirname, 'public', 'index.html')
    return res.sendFile(indexHtml)
})

/**
 * disconnect : undefined
 * exit : 0
 * close : 0
 */

export default app