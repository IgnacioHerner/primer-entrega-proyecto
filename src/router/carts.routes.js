import { Router } from "express";
import CartManager from '../controllers/CartManager.js'

const CartRouter = Router()

const carts = new CartManager

CartRouter.post("/", async(req, res) => {
    res.send(await carts.addCart())
})

CartRouter.get('/', async (req, res) => {
    res.send(await carts.readCarts())
})

export default CartRouter;