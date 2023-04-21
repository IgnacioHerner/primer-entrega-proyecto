import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(products)
    }
    
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }
    
    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(products => products.id === id)
    }

    
    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid(4)
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll)
        return "Added Product"
    };

    getProducts = async () => {
        return await this.readProducts()
    };
    getProductsById = async (id) => {  
        let productById = await this.exist(id)
        if(!productById) return "Product Not Found"
        return productById
    };


    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "Product Not Found"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Updated Product"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(products => products.id === id)
        if (existProducts) {
            let filterProducts = products.filter(products => products.id != id)
            await this.writeProducts(filterProducts)
            return "Product Delete"
        }
        return "Product not delete because not exist";
    }

}

export default ProductManager


