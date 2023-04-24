import ticketsDAO from "../persistence/DAOs/ticketsDAOS/ticketsMongo.js";
import { productsModel } from "../persistence/mongoDB/models/products.model.js";
import cartsService from "./carts.service.js"

// import productsService from "./products.service.js";


const orderGenerator = (max, min)=>{
    return (
        Math.floor(Math.random() * (max - min) + min)
    )
}

class TicketsService {
    constructor() {
        this.dao = ticketsDAO
    }

    async findTicketByOrder(order) {
        const ticket = await ticketsDAO.findTicketByOrder(id)
        return ticket

    }

    async generateTicket(cid, email) {
        const dbCart = await cartsService.getOne(cid)
        const sobrante = [] //no se que hacer con los productos sin stock, ya hice mucho quilombo xd

        const productsSucess = await dbCart.products.filter(async (obj) => {
            const dbProduct = await productsModel.findById(obj.product)
            if (dbProduct.stock >= obj.quantity) {
                dbProduct.stock -= obj.quantity
                dbProduct.save()
                return dbProduct.stock >= obj.quantity
            }
            else{
                sobrante.push(dbProduct)
            }

        })

        const priceTotal = productsSucess.reduce((acc, item) => acc += (item.product.price * item.quantity), 0)


        const ticket = await ticketsDAO.create({
            code: `order-${orderGenerator(1000,10)}-${orderGenerator(100000,1000)}-${orderGenerator(10,1)}`,
            amount: priceTotal,
            purchaser: email,
            products: productsSucess
        })

        return ticket
    }


}

const ticketsService = new TicketsService()
export default ticketsService

// code: {
//     unique: true,
//     type: String,
//     require: true
// },
// purchase_datetime: {
//     require: true
// },
// amount: {
//     type: Number,
//     require: true
// },
// purchaser: {
//     type: String,
//     require: true
// },
// cart: [
//     {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'carts'
//     }
// ],