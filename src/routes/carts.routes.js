import {Router} from "express";
import { cartsService} from "../dao/index.js";


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
        
        const productId = parseInt(req.params.pid);
        //console.log(productId)
        const cartId = parseInt(req.params.cid);
        //console.log(cartId)
        const productCarts = await cartsService.addProductToCart(cartId,productId);
        //console.log(cart)
        
                res.status(200).json({ message: "El producto fue agregado con existe", data:productCarts});
         
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto al carrito ....",error: error.message});
    }
});

export {router as cartsRouter}

/*router.post("/:cid/product/:pid", async (req, res) => { 
    try { 
        const carts = await cartsService.getCarts(); 
        const productId = parseInt(req.params.pid); 
        const cartId = parseInt(req.params.cid); 
        const cart = carts.find((cart) => cart.id === cartId); 
        if (cart) { 
            const productIndex = cart.products.findIndex((product) => product.id === productId); 
            if (productIndex !== -1) { 
                // Si el producto ya existe en el carrito, incrementar la cantidad 
                cart.products[productIndex].quantity += 1; 
            } else { 
                // Si el producto no existe en el carrito, agregarlo 
                cart.products.push({ 
                    product: productId, 
                    quantity: 1 
                }); 
            } 
            await cartsService.updateCart(cart); // Actualizar el carrito en la base de datos 
            res.json({ message: "Producto agregado al carrito con éxito", data: cart }); 
        } else { 
            res.status(404).json({ message: "El carrito no existe" }); 
        } 
    } catch (error) { 
        res.status(500).json({ message: "Error al agregar el producto al carrito" }); 
    } 
});*/

/*router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); 
        const cartId = parseInt(req.params.cid);
        
        const cart = await cartsService.getCartById(cartId);
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado' });
            return;
        }
        
        const existingProduct = cart.products.find(product => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }
        
        await cartsService.updateCart(cartId, cart);
        
        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
    }
});*/

