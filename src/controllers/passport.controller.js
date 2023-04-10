import { usersModel } from '../dao/models/users.models.js'
import {hashPassword} from '../routes/middlewares/auth.js'

export const googleLogin = async (accessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name || '',
            email: profile._json.email,
            password: ' ',
            username: profile.displayName
        }
        const newUserDB = await usersModel.create(newUser)
        return done(null, newUserDB)
    }
    return done(null, user)
}


export const githubLogin = async (acessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' ',
            username: profile._json.login
        }
        const newUserDB = await usersModel.create(newUser)
        return done(null, newUserDB)
    }
    return done(null, user)
}


export const localRegister = async (req, email, password, done) => {
    const user = await usersModel.find({ email })
    if (user.length !== 0) {
        return done(null, false)
    }
    const hashNewPassword = await hashPassword(password)
    const newUser = { ...req.body, password: hashNewPassword }

    const newUserDB = await usersModel.create(newUser)
    done(null, newUserDB)
}


export const jwtPayLoadUser = async (jwtPayload, done) => {
    done(null, jwtPayload.user)
}


export const serialize = (user, done) => {
    done(null, user._id)
}
export const deserialize = async (_id, done) => {
    const user = await usersModel.findById(_id)
    done(null, user)
}