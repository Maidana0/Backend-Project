import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'products',
                }
                ,
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
                //ACA SE ME GENERA UN ID
                //NO SE COMO NO CREARLO xd
            }
        ],
        default: []
    }
})
cartSchema.plugin(mongoosePaginate)

cartSchema.pre('find', function (next) {
    this.populate('products.product')
    next()
})

export const cartsModel = mongoose.model('carts', cartSchema)
