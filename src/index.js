import express, { response } from "express";
import ProductManager from './controllers/ProductManager.js'

const product = new ProductManager();

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/products", async (require, response) =>{
    response.send(await product.getProducts())
})
app.get("/products/:id", async (require, response) =>{
    let id = require.params.id
    response.send(await product.getProductsById(id))
})

app.post("/products", async (require, response) =>{
    let newProduct = require.body
    response.send(await product.addProducts(newProduct))
})

app.put("/products/:id", async (require, response) => {
    let id = require.params.id;
    let updateProduct = require.body;
    response.send(await product.updateProducts(id, updateProduct))
})

app.delete("/products/:id", async (require, response) => {
    let id = require.params.id
    response.send(await product.deleteProducts(id))
})

app.listen(PORT, () =>{
    console.log(`Server Up PORT: ${PORT}`)
})