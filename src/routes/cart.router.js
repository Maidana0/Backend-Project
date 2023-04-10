import Router from './router.js'
import {
    addCart, getCart, addProduct, updateQuantity, updateCart, deleteOneProduct, deleteAllProducts
} from '../controllers/cart.controller.js'




export default class CartsCustomeRouter extends Router {
    init() {
        this.post('/', addCart)

        this.get('/:cid', getCart)

        this.post('/:cid/product/:pid', addProduct)

        this.put('/:cid/product/:pid', updateQuantity)

        this.put('/:cid', updateCart)

        this.delete('/:cid/product/:pid', deleteOneProduct)

        this.delete('/:cid', deleteAllProducts)
    }
}









