import express from "express";
import handlebars from 'express-handlebars'
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"
import __dirname from "./util.js";

const app = express()
const PORT = 8080

app.use(express.static(__dirname+'/public')) // Raiz public Static
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Configuracion de handlebars motor de plantilla Dinamic
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use("/products", ProductRouter)
app.use("/cart", CartRouter)

app.listen(PORT, () =>{
    console.log(`Server Up PORT: ${PORT}`)
})