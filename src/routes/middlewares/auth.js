
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { usersModel } from '../../dao/models/users.models.js'


// Functions
export const hashPassword = async (password) => bcrypt.hash(password, 10)
export const comparePasswords = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword)
export const tokenGenerator = (user) => jwt.sign({ user }, 'secretJWT')

// Login and create session

export const sessionLogin = async (req, res) => {
    req.session.name = req.user.first_name
    req.session.email = req.user.email
    req.session.logged = true
    req.session.isAdmin = req.user.email === "maidana07@admin.com" ? true : false
    res.redirect('/views/products')
}


//
export function auth(req, res, next) {
    if (req.session.logged) next()
    else {
        res.redirect('/views/login')
    }
}
export function isLogged(req, res, next) {
    if (req.session.logged) {
        res.redirect('/views/products')
    } else {
        next()
    }
}








// LOGIN JWT
export const checkLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await usersModel.findOne({ email, })
    if (user) {
        const isPassword = await comparePasswords(password, user.password)
        if (isPassword) {
            const token = tokenGenerator(user)
            return res.cookie('token', token, { httpOnly: true })
                .json({ token })
        }
    }
    return res.render('login', { login: true, deny: true })
}






