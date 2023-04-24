import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'

// secretOrKeys
import config from '../../config.js'
const { google, github, jwt } = config.passport_strategies

// Functions
import {
    googleLogin, githubLogin, localRegister, jwtPayLoadUser, serializeUser, deserializeUser
} from '../../persistence/DAOs/usersDAOs/usersMongo.js'
// uses

passport.use('google', new GoogleStrategy({
    ...google, callbackURL: "http://localhost:8080/account/google"
}, googleLogin)
)

passport.use('github', new GithubStrategy({
    ...github, callbackURL: "http://localhost:8080/account/github"
}, githubLogin)
)

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, localRegister)
)


const cookieStractor = (req) => req?.cokies?.token

passport.use('jwtCookies', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieStractor]),
    secretOrKey: jwt
}, jwtPayLoadUser)
)

passport.use('jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt
}, jwtPayLoadUser)
)


passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)
