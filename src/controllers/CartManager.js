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
        try {
            const cart = await this.exist(cartId);
            if (!cart) {
                return "Cart Not Found";
            }
    
            const product = await productAll.exist(productId);
            if (!product) {
                return "Product Not Found";
            }
            
            const carts = await this.readCarts();
            const updatedCart = {
                ...cart,
                products: cart.products.some((product) => product.id === productId)
                    ? cart.products.map((product) =>
                          product.id === productId
                              ? { ...product, cantidad: product.cantidad + 1 }
                              : product
                      )
                    : [...cart.products, { id: product.id, cantidad: 1 }],
            };
            
            await this.writeCarts([updatedCart, ...carts.filter((cart) => cart.id !== cartId)]);
            return "Product added to cart";
        } catch (error) {
            console.error(error);
            return "An error occurred while adding the product to the cart";
        }
    };
    


}

export default CartManager