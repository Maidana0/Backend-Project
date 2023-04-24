import mongoose from 'mongoose'

function time() {
    let today = new Date()
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    // 
    let hours = today.getHours()
    let minutes = today.getMinutes()
    // 
    let current_date = `Fecha: ${date}/${month}/${year} - Hora: ${hours}:${minutes}`
    return current_date
}

const ticketsSchema = new mongoose.Schema({
    code: {
        unique: true,
        type: String,
        require: true
    },
    purchase_datetime: {
        type: String,
        require: true,
        default: time()
    },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    },
    products:{
        type: Array
    }
    // cart: [
    //     {
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: 'carts'
    //     }
    // ]
})
// ticketsSchema.pre('find', function (next) {
//     this.populate('carts')
//     next()
// })

export const ticketsModel = mongoose.model('tickets', ticketsSchema)