import { error } from "console";
import fs from "fs";
import { productsService } from "./index.js";

export class CartsManagerFiles{
    constructor(filePath){
        this.filePath = filePath;
    };
    
    fileExist(){
        return fs.existsSync(this.filePath);
    };

    async addCarts(){
        try {
            if(this.fileExist()){
                const contenidoSting = await fs.promises.readFile(this.filePath,"utf-8");
                let carts = JSON.parse(contenidoSting);
                const lastCart = carts[carts.length - 1];
                const newId = lastCart ? lastCart.id + 1 : 1;
                const newCarts = {
                    id: newId,
                    products: []
                };
                carts.push(newCarts);
                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
                return newCarts;

            }else{
                throw new Error ("No hay compras para mostrar")
            }
            
        } catch (error) {
            throw error;
        }
    };

    async getCarts(){
        try {
            if(this.fileExist()){
                const contenidoSting = await fs.promises.readFile(this.filePath,"utf-8");
                const carts = JSON.parse(contenidoSting);
                return carts;
            }else{
                throw new Error ("No hay compras para mostrar")
            }
            
        } catch (error) {
            throw error;
        }
    };

    async getCartById(id) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                const carritoEncontrado = contenidoJson.find(carts => carts.id === id);
                if (carritoEncontrado) {
                    return carritoEncontrado;
                } else {
                    throw new Error("Carrito no encontrado, inexistente");
                }
            } else {
                throw new Error("No hay carrito dde compras");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    async addProductToCart(cartId, productId) {
        try {
            if (this.fileExist()) {
                const carts = await this.getCarts();
                const cartIndex = carts.findIndex((cart) => cart.id === cartId);
                const indexProduct = carts[cartIndex].products.findIndex((product) => product.id === productId);
                if (indexProduct === -1) {
                    carts[cartIndex].products.push({
                        id: productId,
                        quantity: 1
                    });
                    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
                    return carts[cartIndex];
                } else {
                    throw new Error("El producto ya existe en el carrito");
                }
            } else {
                throw new Error("No hay compras para mostrar");
            }
        } catch (error) {
            throw error;
        }
    }
  



};

