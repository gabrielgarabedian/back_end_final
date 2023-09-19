import {Router} from "express";
import { productsService } from "../persistence/index.js";
import { uploader } from "../utils.js";
import res from "express/lib/response.js";

const router = Router()

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const prodInfo= req.body;
        const thumbnail = req.file.originalname;
        prodInfo.thumbnail = thumbnail;
        const { title, description, price, stock, code, category } = prodInfo;
        await productsService.addProduct(
            title,
            description,
            price,
            stock,
            code,
            category,
            thumbnail
        );
        res.status(200).json({ message: "Productos cargado"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        await productsService.updateProduct(productId, updatedFields);
        res.json({ message: "Producto actualizado exitosamente.", data: productId });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al actualizar el producto." });
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

/*funciona primera entrega
router.post("/", async (req, res) => {
    try {
        const prodInfo = req.body;
        const {title,description,price,stock,code,category} = prodInfo
        await productsService.addProduct(title,description,price,stock,code,category);
        res.status(200).json({ message: "Productos cargado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/