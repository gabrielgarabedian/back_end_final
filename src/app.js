import express from "express";
import { ProductManager } from "./persistence/productManagerFiles.js";

const managerProductService = new ProductManager("./src/files/products.json")
console.log(managerProductService)
const port = 8080;

const app= express();

app.listen(port,()=>console.log("servidor funcionando"))

//rutas

app.get("/products", async(req,res) =>{
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