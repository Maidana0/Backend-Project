
export default class UsersDbDto {
    constructor(user) {
        this.username = user.username ? user.username : `${user.name} ${user.lastName}`,
            this.first_name = user.name ? user.name : user.username.split(' ')[0],
            this.last_name = user.lastName ? user.lastName : user.username.split(' ')[1],
            this.email = user.email,
            this.password = user.password ? user.password : ' ',
            this.role = user.role,
            user.tel ? this.tel = user.tel : '',
            user.cart ? this.cart = user.cart : ''
    }
}



