import { productsModel } from '../../mongoDB/models/products.model.js'

const textError = numero => `Ocurrio un Error. El producto con el id:"${numero}" no existe.`

 class ProductsDao {

    async getProducts(obj) {
        try {
            const { limit, page, sort, query } = await obj
            const options = {
                page,
                limit,
                sort,
                lean: true
            }
            const infoProducts = await productsModel.paginate(query, options)

            const prevLink = infoProducts.hasPrevPage ? `http://localhost:8080/api/products?page=${infoProducts.page - 1}` : null
            const nextLink = infoProducts.hasNextPage ? `http://localhost:8080/api/products?page=${infoProducts.page + 1}` : null

            return {
                status: 'success',
                payload: infoProducts.docs,
                totalPages: infoProducts.totalPages,
                prevPag: infoProducts.prevPag,
                nextPage: infoProducts.nexPag,
                page: infoProducts.page,
                hasPrevPage: infoProducts.hasPrevPage,
                hasNextPage: infoProducts.hasNextPage,
                prevLink,
                nextLink
            }

        } catch (error) {
            return { error }
        }
    }

    async getProductById(getId) {
        try {
            const getProduct = await productsModel.paginate({ _id: getId }, { lean: true })
            if (getProduct.docs) {
                return getProduct.docs
            }
            return { "error": textError(getId) }

        } catch (error) {
            return { error }
        }
    }

    async addProduct(obj) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = obj
            const alReadyExist = await productsModel.find({ code: code })

            if (alReadyExist) return { "error": `Ocurrio un Error. El code "${code}" ya existe.` }

            const currentProduct = {
                title, description, code, price, status, stock, category,
                "thumbnails": [thumbnails]
            }

            const addedProduct = await productsModel.create(currentProduct)
            return addedProduct
        }
        catch (error) {
            return { error }
        }
    }

    async updateProduct(idProd, obj) {
        try {
            const updateProd = await productsModel.findByIdAndUpdate(idProd, obj,
                { new: true })
            // if (!updateProd) return { "error": textError(idProd) };
            return updateProd
        }
        catch (error) {
            return { error }
        }
    }

    async deleteProduct(byId) {
        try {
            const deleteThis = await productsModel.findByIdAndDelete(byId)
            if (deleteThis) {
                return deleteThis
            }
            // return { "error": textError(byId) }
        } catch (error) {
            return { error }
        }
    }
}


 const productsDAO = new ProductsDao()
 export default productsDAO