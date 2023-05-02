import express from "express"; // Importar Express
import { Server } from "socket.io"; // Importar socket.io
import handlebars from 'express-handlebars' // Importar handlebars express 
import ProductRouter from "./router/product.routes.js" // Traer mediante la carpeta "router" el archivo product.routes.js
import CartRouter from "./router/carts.routes.js" // Traer mediante la carpeta "router" el archivo carts.routes.js
import ViewsRouter from "./router/views.routes.js"; // Traer mediante la carpeta "router" el archivo views.routes.js
import __dirname from "./util.js"; // INVESTIGAR BIEN

const app = express() // iniciar servidor con express
const PORT = 8080 // Puerto del servidor

const httpServer = app.listen(PORT, () =>{
    console.log(`Server Up PORT: ${PORT}`)
})

const io = new Server(httpServer) //handshake = apreton de manos

//Configuracion de handlebars motor de plantilla Dinamic
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname+'/public')) // Raiz public Static
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/products", ProductRouter)
app.use("/cart", CartRouter)
app.use("/realTimeProducts", ViewsRouter)

io.on('connection', socket => console.log(`Cliente socket ${socket.id} conectado`))