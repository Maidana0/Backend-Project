import productsService from '../services/products.service.js'

class ProductsController {
    getProducts = async (req, res) => {
        try {
            const { limit, page, query, sort } = await req.query
            const products = await productsService.getAll(limit, page, query, sort)
            res.json({
                message: "Lista de productos",
                products
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await productsService.getOne(pid)
            res.json(product)
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }

    addProduct = async (req, res) => {
        try {
            const product = req.body
            const addedProduct = await productsService.add(product)
            res.json({
                message: "Producto agregado!",
                addedProduct
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const product = req.body
            const updateProduct = await productsService.update(pid, product)
            res.json({
                message: "Producto actualizado!",
                updateProduct
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const productDeleted = await productsService.deleteOne(pid)
            res.json({
                message: "Producto eliminado!",
                productDeleted
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
}


const productsController = new ProductsController()
export default productsController