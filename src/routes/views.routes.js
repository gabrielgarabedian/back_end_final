import { Router } from "express";
import { productsService } from "../dao/index.js";
import { chatService } from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productsService.getProducts();
    //console.log("esto trajo",products);
    res.render("home",{products:products});
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTime");
})


/*app.get("/chat", async (req, res) => {
    try {
        const messages = await chatService.getMessage();
        res.render("chat", { messages });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los mensajes del chat");
    }
});*/

export {router as viewRouter};