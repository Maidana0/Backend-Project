import Router from './router.js'
import productsController from '../controllers/products.controller.js'

import { onlyAdmin } from './middlewares/auth.js'

export default class ProductsCustomeRouter extends Router {
    init() {

        this.get('/', productsController.getProducts)
        this.get('/:pid', productsController.getProductById)


        this.post('/', onlyAdmin, productsController.addProduct)
        this.put('/:pid', onlyAdmin, productsController.updateProduct)
        this.delete('/:pid', onlyAdmin, productsController.deleteProduct)
    }
}
