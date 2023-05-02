import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js'

const product = new ProductManager();
const ViewsRouter = Router()

ViewsRouter.get('/', async (req, res) => {
    let allProducts = await product.getProducts()
    res.render('realTimeProducts', {
        products : allProducts
    })
})



export default ViewsRouter