import { cartsModel } from '../../mongoDB/models/carts.model.js'

class CartsDao {

    async getAll() {
        try {
            const infoProducts = await cartsModel.paginate({}, { lean: true })
            return infoProducts.docs
        } catch (error) {
            return error
        }
    }

    async getCart(getId) {
        try {
            const getCart = await cartsModel.paginate({ _id: getId }, { lean: true })
            if (getCart.docs) return getCart.docs[0]
            return "El carrito que buscas no existe en nuestra base de datos."
        } catch (error) {
            return error
        }
    }

    async addCart() {
        try {

            const newCart = await cartsModel.create({ "products": [] })
            return newCart
        }
        catch (error) {
            return error
        }
    }

    async addProduct(cid, pid) {
        try {

            const thisCart = await cartsModel.findById(cid)
            const repetido = thisCart.products.find(item => item.product == pid)
            if (repetido === undefined) {
                thisCart.products.push({
                    product: pid,
                    quantity: 1
                })
            } else {
                const i = thisCart.products.indexOf(repetido)
                const updatedProduct = { product: pid, quantity: repetido.quantity + 1 }
                thisCart.products.splice(i, 1, updatedProduct)
            }
            const currentCart = await thisCart.save()
            return currentCart
        } catch (error) {
            return error
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const thisCart = await cartsModel.findById(cid)
            const thisProduct = thisCart.products.find(item => item.product == pid)
            const newProduct = { ...thisProduct, quantity }

            const i = thisCart.products.indexOf(thisProduct)
            if (i >= 0) {
                thisCart.products.splice(i, 1, newProduct)
                const cart = await thisCart.save()
                return cart
            }
            else {
                return `El producto con el ID: ${pid} no se encuentra en el carrito con el ID: ${cid}`
            }
        } catch (error) {
            return { error }
        }
    }

    async updateCart(cid, products) {
        try {
            const thisCart = await cartsModel.findById(cid)
            thisCart.products = products
            const currentCart = await thisCart.save()
            return currentCart
        } catch (error) {
            return error
        }
    }

    async deleteThisProduct(cid, pid) {
        try {
            const thisCart = await cartsModel.findById(cid)
            const thisProduct = thisCart.products.findIndex(item => item.product == pid)
            if (thisProduct >= 0) {
                thisCart.products.splice(thisProduct, 1)
                const currentCart = await thisCart.save()
                return { currentCart }
            }
            else {
                return 'No se encuentra el producto solicitado!!'
            }

        } catch (error) {
            return error
        }
    }

    async deleteAllProducts(cid) {
        try {
            const thisCart = await cartsModel.findById(cid)
            thisCart.products = []
            const currentCart = await thisCart.save()
            return currentCart
        } catch (error) {
            return error
        }
    }

}

const cartsDao = new CartsDao()
export default cartsDao