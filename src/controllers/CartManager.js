import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'

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

    addCart = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid(4)
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Added Product"
    }
}

export default CartManager