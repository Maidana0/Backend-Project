export default class UserRespDto {
    constructor(user) {
        this.fullname = user.username,
            this.email = user.email,
            this.role = user.role,
            this.id = user._id,
            user.cart ? this.cart = user.cart : ''
    }
}