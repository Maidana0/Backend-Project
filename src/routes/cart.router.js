import Router from './router.js'
import cartController from '../controllers/cart.controller.js'


import ticketController from '../controllers/ticket.controller.js'

export default class CartsCustomeRouter extends Router {
    init() {
        this.get('/', cartController.getAllCarts)
        this.get('/:cid', cartController.getOneCart)

        this.post('/', cartController.addCart)
        this.post('/:cid/product/:pid', cartController.addProductToCart)

        this.put('/:cid/product/:pid', cartController.updateProductQuantity)
        this.put('/:cid', cartController.updateCart)

        this.delete('/:cid/product/:pid', cartController.deleteProductInCart)
        this.delete('/:cid', cartController.deleteAllProductsInCart)

        this.post('/:cid/purchase', ticketController.generateTicket)
    }
}









