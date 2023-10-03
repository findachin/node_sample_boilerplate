import { Router } from "express"
import { fork } from 'child_process';
import passport, { authenticate } from "../utils/passport.auth.js";

const router = Router()

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
)

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/v1/failure',
    successRedirect: '/',
    session: true
}),
    (req, res) => {
        console.log("Google callback recieved");
    }
)

router.get('/failure', (req, res) => {
    res.status(401).send("Unauthorized")
})

router.get('/auth/logout', (req, res) => {
    console.log("Logout initiated");
    req.logout();
    req.session.destroy();
    return res.redirect('/');
})


router.get('/compute', authenticate, (req, res) => {
    const child = fork('./fork.js')
    child.send('start')
    child
        .on('spawn', () => console.log("A new child has been spawned on PID:", child.pid))
        .on('message', (data) => {
            const msg = `sum : ${data}`
            console.log(msg);
            return res.send(msg)
        })
        .on('close', (msg) => console.log('close :', msg))
        .on('disconnect', (msg) => console.log('disconnect :', msg))
        .on('exit', (msg) => console.log('exit :', msg))

})

export default router;