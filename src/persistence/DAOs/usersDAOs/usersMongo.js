import UsersRepository from '../../repositories/users.repository.js'
const usersDao = new UsersRepository()

// FUNCIONES PARA PASSPORT

export const googleLogin = async (accessToken, refreshToken, profile, done) => {

    const existUser = await usersDao.findUserByEmail(profile._json.email)
    if (!existUser) {
        const { given_name: name,
            family_name: lastName, email,
            name: username } = profile._json

        const user = await usersDao.createUser({
            username, name, lastName, email
        })
        return done(null, user)
    }
    return done(null, existUser)
}


export const githubLogin = async (acessToken, refreshToken, profile, done) => {
    const existUser = await usersDao.findUserByEmail(profile._json.email)
    if (!existUser) {
        const { name: username, email } = profile._json
        const user = await usersDao.createUser({
            username, email
        })
        return done(null, user)
    }
    return done(null, existUser)
}


export const localRegister = async (req, email, password, done) => {
    const existUser = await usersDao.findUserByEmail(email)
    if (existUser) {
        return done(null, false)
    }
    const account = {
        ...req.body,
        role: email == "maidana07@admin.com" ? "admin" : "user",
    }
    const user = await usersDao.createUserHash(account, password)
    done(null, user)
}


export const jwtPayLoadUser = async (jwtPayload, done) => {
    const user = await usersDao.respDto(jwtPayload.user)
    done(null, user)
}

export const serializeUser = (user, done) => {
    done(null, user.id)
}

export const deserializeUser = (async (id, done) => {
    const user = await usersDao.findUserById(id)
    done(null, user)
})