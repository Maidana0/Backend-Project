import cartsDao from '../persistence/DAOs/cartDAOs/cartsMongo.js'
// import cartsDao from '../persistence/DAOs/cartDAOs/cartsMongo.js'

// import Dao from '../persistence/DAOs/factory.js'


class CartService {
    constructor() {
        // this.dao = Dao

        this.dao = cartsDao
    }
    getAll = async () => {
        const allCarts = this.dao.getAll()
        return allCarts

    }

    getOne = async (cid) => {
        const thisCart = await this.dao.getCart(cid)
        return thisCart
    }
    add = async () => {
        const addCart = await this.dao.addCart()
        return addCart
    }
    addProduct = async (cid, pid) => {
        const cart = await this.dao.addProduct(cid, pid)
        return cart
    }
    updateQuantity = async (cid, pid, quantity) => {
        const cart = await this.dao.updateQuantity(cid, pid, quantity)
        return cart
    }

    update = async (cid, products) => {
        const cart = await this.dao.updateCart(cid, products)
        return cart
    }
    deleteOneProduct = async (cid, pid) => {
        const cart = await this.dao.deleteThisProduct(cid, pid)
        return cart

    }
    deleteAllProducts = async (cid) => {
        const cart = await this.dao.deleteAllProducts(cid)
        return cart
    }


}


const cartsService = new CartService()
export default cartsService