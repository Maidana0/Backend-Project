import UsersDbDto from '../DTOs/usersDB.dto.js'
import UsersResDto from '../DTOs/usersResp.dto.js'
import { usersModel } from '../mongoDB/models/users.models.js'
import { hashPassword } from '../../routes/middlewares/auth.js'

import cartsService from '../../services/carts.service.js'

export default class UsersRepository {
    // constructor (dao){
    //     this.dao = dao
    // }

    async createUser(user) {
        const cart = await cartsService.add()
        const usersDbDto = new UsersDbDto({ ...user, cart })

        // const userDao = await this.dao.create(usersDbDto)
        const userDao = await usersModel.create(usersDbDto)

        const usersResDto = new UsersResDto(userDao)
        return usersResDto
    }



    async createUserHash(account,pass) {

        const password = await hashPassword(pass)
        let user
        if (account.role == "admin") {
            user = { ...account, password }
        } else {
            const cart = await cartsService.add()
            user = { ...account, password, cart }
        }
        const usersDbDto = new UsersDbDto(user)
        // const userDao = await this.dao.create(usersDbDto)
        const userDao = await usersModel.create(usersDbDto)

        const usersResDto = new UsersResDto(userDao)
        return usersResDto
    }




    async respDto(user) {
        const respUser = new UsersResDto(user)
        return respUser
    }

    async findUserByEmail(e) {

        // const existUser = await this.dao.findOne({email:e})
        const existUser = await usersModel.findOne({ email: e })
        return existUser
    }


    async findUserById(id) {
        // // const user = await this.dao.findById(id)
        const user = await usersModel.findById(id)
        return user
    }
}
