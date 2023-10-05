import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productsService.getProducts();
    //console.log("esto trajo",products);
    res.render("home",{products:products});
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTime");
})

router.get("/chat", (req,res)=>{
    res.render("chat");
})

export {router as viewRouter};