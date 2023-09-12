import {Router} from "express";
import { productsService } from "../persistence/index.js";
import res from "express/lib/response.js";

const router = Router()

router.post("/", async (req, res) => {
    try {
        const prodInfo = req.body;
        const {title,description,price,stock,code} = prodInfo
        await productsService.addProduct(title,description,price,stock,code);
        res.status(200).json({ message: "Productos cargado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productsService.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json({ message: "Listado de productos limitado", data: limitedProducts });
        } else {
            res.json({ message: "Listado de productos", data: products });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId); 
        if (product) {
            res.json({ message: "Producto encontrado", data: product });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
  });

export {router as productsRouter}