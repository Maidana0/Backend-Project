import Router from './router.js'
import passport from 'passport'

import { checkLogin, sessionLogin } from './middlewares/auth.js'

export default class UsersCustomeRouter extends Router {
    init() {
        //REGISTER
        this.post('/register', passport.authenticate('register', {
            failureRedirect: '/views/register/error',
            successRedirect: '/views/register/sucess',
            passReqToCallback: true
        }))

        //JWT - LOGIN
        this.post('/login', checkLogin)

        this.post('/login/jwt', passport.authenticate('jwt', {
            passReqToCallback: true,
            session: false
        }), sessionLogin
        )


        // LOGOUT
        this.get('/logout', async (req, res) => {
            try {
                req.session.destroy((error) => error ? console.log(error)
                    : res.redirect('/views/login'))
            } catch (error) { console.log(error) }
        })

        // AUTH GOOGLE
        this.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

        this.get('/google', passport.authenticate('google',
            { failureRedirect: '/views/register/error' }), sessionLogin
        )

        // AUTH GITHUB
        this.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }))

        this.get('/github', passport.authenticate('github',
            { failureRedirect: '/views/register/error' }), sessionLogin
        )



    }
}