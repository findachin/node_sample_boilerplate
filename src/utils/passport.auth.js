import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from '../config/index.js'

const AUTH_OPTIONS = {
    callbackURL: config.googleOAUTH.callbackURL,
    clientID: config.googleOAUTH.clientID,
    clientSecret: config.googleOAUTH.clientSecret
}
console.log({ AUTH_OPTIONS });

function verifyCallback(acessToken, refreshToken, profile, done) {
    console.log("User profile:", profile);
    done(null, profile)
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

passport.serializeUser((user, done) => {
    process.nextTick(function () {
        console.log("user.id :", user.id);
        done(null, { id: user.id })
    })
})

passport.deserializeUser((obj, done) => {
    process.nextTick(function () {
        done(null, obj)
    });
})

export function authenticate(req, res, next) {
    console.log('CurrentUser: ', req.user, req.isAuthenticated());
    const loggedIn = req.user && req.isAuthenticated()

    if (!loggedIn) {
        return res.status(401).send({ error: "Access Unauthorized" })
    }
    next()
}

export default passport