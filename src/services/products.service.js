import productsDAO from '../persistence/DAOs/productsDAOs/productsMongo.js'
// import productsDAO from '../persistence/DAOs/productsDAOs/productsFile.js'

// import Dao from '../persistence/DAOs/factory.js'

            
class ProductsService {
    constructor() {
        // this.dao = Dao

        this.dao = productsDAO
    }

    getAll = async (Plimit, Ppage, Pquery, Psort) => {
        function ordenar(orde) {
            if (orde == 'asc') return 1
            if (orde == 'desc') return -1
            else { return false }
        }
        const price = ordenar(Psort)

        const limit = Plimit ? Number(Plimit) : 10
        const page = Ppage ? Number(Ppage) : 1
        const query = Pquery ? { category: Pquery } : { status: true }
        const sort = Psort ? { price } : { _id: 1 }

        const obj = { limit, page, sort, query }

        const list = await this.dao.getProducts(obj)
        return list
    }

    getOne = async (pid) => {
        const product = this.dao.getProductById(pid)
        return product

    }

    add = async (product) => {
        const addProduct = await this.dao.addProduct(product)
        return addProduct

    }

    update = async (pid, product) => {

        const updateProd = await this.dao.updateProduct(pid, product)
        return updateProd

    }

    deleteOne = async (pid) => {
        const deleteProduct = await this.dao.deleteProduct(pid)
        return deleteProduct

    }
}



const productsService = new ProductsService()
export default productsService