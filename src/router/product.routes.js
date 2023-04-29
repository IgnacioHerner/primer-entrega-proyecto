import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js'

const ProductRouter = Router()
const product = new ProductManager();


ProductRouter.get('/', async (req, res) => {
    let allProducts = await product.getProducts()
    res.render('home', {
        products : allProducts
    })
})

ProductRouter.get("/", async (require, response) =>{
    response.send(await product.getProducts())
})
ProductRouter.get("/:id", async (require, response) =>{
    let id = require.params.id
    response.send(await product.getProductsById(id))
})

ProductRouter.post("/", async (require, response) =>{
    let newProduct = require.body
    response.send(await product.addProducts(newProduct))
})

ProductRouter.put("/:id", async (require, response) => {
    let id = require.params.id;
    let updateProduct = require.body;
    response.send(await product.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:id", async (require, response) => {
    let id = require.params.id
    response.send(await product.deleteProducts(id))
})

export default ProductRouter;