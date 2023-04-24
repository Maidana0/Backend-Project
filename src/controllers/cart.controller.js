import cartsService from "../services/carts.service.js"

class CartController {
    getAllCarts = async (req, res) => {
        try {
            const carts = await cartsService.getAll()
            res.json({
                message: "Todos los carritos",
                carts
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    getOneCart = async (req, res) => {
        try {
            const idCart = req.params.cid
            const cart = await cartsService.getOne(idCart)
            res.json({
                message: `Carrito con el id ${idCart}`,
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    addCart = async (req, res) => {
        try {
            const newCart = await cartsService.add()
            res.json({
                message: 'Carrito creado con exito!',
                newCart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const cart = await cartsService.addProduct(cid, pid)
    
            res.json({
                message: 'Producto agregado!',
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const cart = await cartsService.updateQuantity(cid, pid, quantity)
            res.json({
                message: 'Producto actualizado con exito!',
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    updateCart = async (req, res) => {
        try {
            const { cid } = req.params
            const { products } = req.body
            const cart = await cartsService.update(cid, products)
            res.json({
                message: 'Carrito actualizado!',
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const cart = await cartsService.deleteOneProduct(cid, pid)
            res.json({
                message: 'Producto eliminado del carrito!',
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
    deleteAllProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartsService.deleteAllProducts(cid)
            res.json({
                message: 'Carrito vaciado con exito',
                cart
            })
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
}

const cartController = new CartController()
export default cartController