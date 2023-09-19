import express from "express";
import { ProductManager } from "./persistence/productManagerFiles.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import {Server} from "socket.io";
import { viewRouter } from "./routes/views.routes.js";
import { productsService } from "./persistence/index.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { uploader } from "./utils.js";



const managerProductService = new ProductManager("./src/files/products.json")
//console.log(managerProductService)
const port = 8080;

const app= express();

const httpServer = app.listen(port,()=>console.log(`servidor funcionando ${port}`));

//servidro webSocket
const io = new Server(httpServer);

//configuración Handlerbars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// middleware.
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//rutas
app.use(viewRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

//socket Server
io.on("connection", async(socket)=>{
    console.log("Cliente conectado");
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
         //recibir data
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
});


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
  });*/