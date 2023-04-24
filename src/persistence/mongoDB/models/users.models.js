import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        default:'user'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
})
userSchema.pre('find', function (next) {
    this.populate('cart')
    next()
})

export const usersModel = mongoose.model('users', userSchema)