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

ViewsRouter.post('/', async (req, res) => {
    const data = req.body;
    try {
        // Agregar el producto a la base de datos
        await product.addProducts(data);
        // Renderizar la vista de productos en tiempo real con el nuevo producto agregado
        const products = await product.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        // Manejar errores si ocurren al agregar el producto
        console.error(error);
        res.status(500).send('Error al agregar el producto');
    }
})



export default ViewsRouter