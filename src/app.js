import express from "express";
import { ProductManager } from "./dao/productManagerFiles.js";
import { productsService } from "./dao/index.js";
import { chatService } from "./dao/index.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import {Server} from "socket.io";
import { viewRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { uploader } from "./utils.js";
import { connect } from "http2";
import { connectDB } from "./config/dbConnection.js";

const managerProductService = new ProductManager("./src/files/products.json")
const port = process.env.PORT || 8080;
const app= express();

// middleware.
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Servidor express http
const httpServer = app.listen(port,()=>console.log(`servidor funcionando ${port}`));
//servidor webSocket
const io = new Server(httpServer);
//conexion atlas DB
connectDB();

//configuración Handlerbars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//rutas
app.use(viewRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

let chat =[];
//socket Server
io.on("connection", async(socket)=>{
    console.log("Cliente conectado");
    console.log("Cliente conectado al chat");

    //io del chat
    //const messageDB = await chatService.getMessage();
    
    //historial del usuario
    socket.emit("chatHistory", chat);
    //socket.emit("chatHistory", messageDB);

    //recibimos del usuario
    socket.on("msgChat",(data)=>{
        chat.push(data);
        //enviamos a todos el historial
        io.emit("chatHistory", chat)
        
    });
    /*socket.on("msgChat", async (data) => {
        if (data.message.trim() !== "") {
          await chatService.addMessage(data); // Agregar mensaje a la base de datos
          const updatedMessageDB = await chatService.getMessage(); // Obtener el historial actualizado
          io.emit("chatHistory", updatedMessageDB);
        }
      });*/

    //notificacion de nuevo usuario conectado
    socket.on("authenticated", (data)=>{
        socket.broadcast.emit("newUser", `User ${data} se acaba de conectar`);
    });

    //io de productos
    const products = await productsService.getProducts();
    socket.emit("Product Array", products);

    socket.on("addProduct", async (productData) => {
        try {//recibe data
            await productsService.addProduct(productData);
            const products = await productsService.getProducts();
            io.emit("Product Array", products);
            console.log(products);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });

    // Recibir datos para eliminar un producto
    socket.on("deleteProduct", async (productId) => {
        try {
            await productsService.deleteProduct(productId);
            const products = await productsService.getProducts();
            io.emit("Product Array", products);
            io.emit("productDeleted", productId);
            socket.emit("message", "producto eliminado exitosamente");
            console.log(products);            
        } catch (error) {
            socket.emit("error", error.message);
        }
    });
});

/*     //recibir data
    /*socket.on("addProduct", async(productData)=>{
        await productsService.addProduct(productData);
        const products = await productsService.getProducts();
        io.emit("Product Array", products);
        console.log(products)
    });*/

    /*
    socket.on("addProduct", uploader.single("file"), async (productData) => {
        const thumbnail = productData.file.filename;
        const { title, description, price, stock, code, category } = productData.body;

        const result = await productsService.addProduct(
            title,
            description,
            price,
            stock,
            code,
            category,
            thumbnail
        );

        const products = await productsService.getProducts();
        io.emit("Product Array", products);
        console.log(products);
    });
    
    socket.on("addProduct", uploader.single("file"), async (productData) => { 
        const thumbnail = productData.file.filename; 
        productData.thumbnail = thumbnail; 
        const { title, description, price, stock, code, category } = productData; 
        await productsService.addProduct( 
            title, 
            description, 
            price, 
            stock, 
            code, 
            category, 
            thumbnail 
        ); 
        const products = await productsService.getProducts(); 
        io.emit("Product Array", products); 
        console.log(products); 
    });*/
//});


///////////////////////////////////////////////////////////////////////////
///primeras entregas


/*app.get("/products", async(req,res) =>{
    try {
        const limit = parseInt(req.query.limit);

        const products = await managerProductService.getProducts();
        if (limit){
            const limitedProducts = products.slice(0, limit);
            res.send(limitedProducts);
        }else{
            res.send(products);
        }
    } catch (error) {
        res.send(error.message)
    }

});

// Obtener el ID del producto desde req.params
app.get("/products/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid); 
        const product = await managerProductService.getProductById(pid);
        res.send(product);
    } catch (error) {
        res.send(error.message)
    }
});
  */