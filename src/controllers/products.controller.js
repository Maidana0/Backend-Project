// import { ProductManagerDB } from "../components/mongoDB/ProductManagerDB.js";
// const prod = new ProductManagerDB()

export const getAll = async (req, res) => {
    try {
        function ordenar(orde) {
            if (orde == 'asc') return 1
            if (orde == 'desc') return -1
            else { return false }
        }

        const limit = req.query.limit ? Number(req.query.limit) : 10
        const page = req.query.page ? Number(req.query.page) : 1
        const query = req.query.query ? { category: req.query.query } : { status: true }
        const sort = req.query.sort ? { price: ordenar(req.query.sort) } : { _id: 1 }

        const obj = { limit, page, sort, query }

        const list = await prod.getProducts(obj)
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}
export const getOne = async (req, res) => {
    try {
        const idProduct = req.params.pid
        res.redirect(`/views/products/${idProduct}`)
    } catch (error) {
        console.log(error)
    }
}
export const addProduct = async (req, res) => {
    try {
        const obj = req.body
        const addProduct = await prod.addProduct(obj)

        if (addProduct.error) return res.json(addProduct)
        res.json(addProduct)
        //  res.redirect('/views')
    } catch (error) {
        console.log(error)
    }
}
export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const obj = req.body
        const updateProd = await prod.updateProduct(idProd, obj)
        res.json(updateProd)
    } catch (error) {
        console.log(error)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const product = parseInt(req.params.pid)
        const deleteProduct = await prod.deleteProduct(product)
        res.json(deleteProduct)
    } catch (error) {
        console.log(error)
    }
}