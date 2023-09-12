import {Router} from "express";
import { cartsService, productsService } from "../persistence/index.js";


const router = Router()

router.post("/",async(req,res)=>{
    try {
        const newCarts = await cartsService.addCarts();
        res.json({ message: "Se Cargo el carrito", data: newCarts });
        
    } catch (error) {
        res.status(500).json({ message: "Error el Carrito con productos", error: error.message });
    }
})

router.get("/", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        res.json({ message: "Listado de Carritos", data: carts });
        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los Carrito con productos", error: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        const cartId = parseInt(req.params.cid);
        const cart = carts.find((cart) => cart.id === cartId);
        if (cart) {
            res.json({ message: "Carrito encontrado", data: cart });
        } else {
            res.status(404).json({ message: "El carrito no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los carrito" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        ///console.log(carts)
        const productId = parseInt(req.params.pid);
        //console.log(productId)
        const cartId = parseInt(req.params.cid);
        //console.log(cartId)
        const cart = carts.find((cart) => cart.id === cartId);
        //console.log(cart)
        if (cart) {
            const product = await productsService.getProductsById(productId);
            console.log(product)
            if (product) {
                const productCarts = await cartsService.addProductToCart(cartId, productId);
                console.log(productCarts)
                res.json({ message: "agregado con exito", data: cart });
            } else {
                res.status(404).json({ message: "El producto no existe" });
            }
        } else {
            res.status(404).json({ message: "El carrito no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto al carrito ...." });
    }
});

export {router as cartsRouter}