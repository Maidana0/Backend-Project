import Router from './router.js'
import {
    getAll, getOne, addProduct, updateProduct, deleteProduct
} from '../controllers/products.controller.js'

export default class ProductsCustomeRouter extends Router {
    init() {

        this.get('/', getAll)

        this.get('/:pid', getOne)

        this.post('/', addProduct)

        this.put('/:pid', updateProduct)

        this.delete('/:pid', deleteProduct)
    }
}
