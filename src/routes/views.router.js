// import Router from './router.js'
// import { isLogged, auth } from "./middlewares/auth.js";

// import CartManagerDB from "../persistence/DAOs/cartDAOs/cartsMongo.js";
// import  ProductManagerDB  from "../persistence/DAOs/productsDAOs/productsMongo.js";

// const onlineProducts = new ProductManagerDB()
// const carts = new CartManagerDB()
// //---------------------------------------------------------------------
// //VIEWS CHAT
// export default class ViewsCustomeRouter extends Router {
//   init() {
//     // VIEWS CARTS

//     this.get('/carts', auth, async (req, res) => {
//       try {
//         const allCarts = await carts.getCarts()
//         res.render('carts', { "viewsAll": true, allCarts })
//       } catch (error) {
//         console.log(error)
//       }
//     })
//     this.get('/carts/:cid', auth, async (req, res) => {
//       try {
//         const cartId = req.params.cid
//         const cart = await carts.getCart(cartId)
//         res.render('carts', { "viewsAll": false, cart })
//       } catch (error) {
//         console.log(error)
//       }
//     })


//     this.get('/products', auth, async (req, res) => {

//       try {
//         function ordenar(orde) {
//           if (orde == 'asc') return 1
//           if (orde == 'desc') return -1
//           else { return false }
//         }

//         const limit = req.query.limit ? Number(req.query.limit) : 10
//         const page = req.query.page ? Number(req.query.page) : 1
//         const query = req.query.query ? { category: req.query.query } : { status: true }
//         const sort = req.query.sort ? { price: ordenar(req.query.sort) } : { _id: 1 }

//         const obj = { limit, page, sort, query }

//         const products = await onlineProducts.getProducts(obj)

//         return res.render('products', {
//           'list': products.payload,
//           'product': false,

//           admin: req.session.isAdmin,
//           name: req.session.name || '',
//           email: req.session.email,
//           logged: req.session.logged
//         })

//       } catch (error) {
//         console.log(error)
//       }

//     })

//     this.get('/products/:pid', auth, async (req, res) => {
//       try {
//         const idProduct = req.params.pid
//         const aProduct = await onlineProducts.getProductById(idProduct)
//         res.render('products', { 'list': aProduct[0], 'product': true })

//       } catch (error) {
//         console.log(error)
//       }
//     })
//     //---------------------------------------------------------------------
//     //---------------------------------------------------------------------

//     // LOGIN LOCAL
//     this.get('/login', isLogged, async (req, res) => {
//       try {
//         res.render('login', { login: true })
//       }
//       catch (e) {
//         console.log(e)
//       }
//     })





//     // REGISTER
//     this.get('/register', isLogged, async (req, res) => {
//       try {
//         res.render('login', { login: false, finish: false })
//       } catch (error) {
//         console.log(error)
//       }
//     })

//     this.get('/register/:state([a-zA-Z]+)', isLogged, async (req, res) => {
//       this
//       try {
//         const state = req.params.state
//         if (state === 'error') {
//           return res.render('login', { login: false, finish: false, denyEmail: true })
//         }
//         if (state === 'sucess') {
//           return res.render('login', { login: false, finish: true })
//         }
//         else {
//           console.log(state)
//           res.send('Ocurrio un error. Intentelo nuevamente')
//         }


//       } catch (error) {
//         console.log(error)
//       }
//     })
//   }
// }