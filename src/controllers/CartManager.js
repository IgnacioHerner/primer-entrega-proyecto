import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(carts)
    };
    
    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    };
    
    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }
    addCart = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid(4)
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Added Product"
    };
    getCartById = async (id) => {  
        let cartById = await this.exist(id)
        if(!cartById) return "Cart Not Found"
        return cartById
    };
    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Cart Not Found"
        let productById = await productAll.exist(productId)
        if(!productById) return "Product Not Found"
        
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId)

        if(cartById.products.some((product) => product.id === productId)){
            let moreProductInCart = cartById.products.find((product) => product.id === productId)
            moreProductInCart.cantidad++;
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Product added to cart"
        }

        cartById.products.push({id:productById.id, cantidad: 1})

        let cartsConcated = [cartById, ...cartFilter]

        await this.writeCarts(cartsConcated)
        return "Product added to cart"
    }


}

export default CartManager