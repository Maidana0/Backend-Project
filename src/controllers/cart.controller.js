// import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";
// const carts = new CartManagerDB()



export const addCart = async (req, res) => {
    try {
        const addCart = await cartManager.addCart()
        res.send(addCart)
    } catch (error) {
        return error
    }
}

export const getCart = async (req, res) => {
    try {
        const idCart = req.params.cid
        const aCart = await cartManager.getCart(idCart)
        // res.redirect(`/views/cartManager/${aCart._id}`)
        res.json(aCart)
    } catch (error) {
        return error
    }
}

export const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const carti = await cartManager.addProduct(cid, pid)
        res.send(carti)
    } catch (error) {
        return error
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const currentCart = await cartManager.updateQuantity(cid, pid, quantity)
        res.json(currentCart)
    } catch (error) {
        return error
    }
}

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body
        const newProducts = await cartManager.updateCart(cid, products)
        res.json(newProducts)
    } catch (error) {
        return error
    }
}

export const deleteOneProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const currentCart = await cartManager.deleteThisProduct(cid, pid)
        res.send(currentCart)
    } catch (error) {
        return error
    }
}

export const deleteAllProducts = async (req, res) => {
    try {
        const { cid } = req.params
        const deleteProducts = await cartManager.deleteAllProducts(cid)
        res.json(deleteProducts)
    } catch (error) {
        return error
    }
}
