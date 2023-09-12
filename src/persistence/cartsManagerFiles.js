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
                throw new Error ("No hay carritos de compras para mostrar")
            }
            
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener los carritos de compras");
        }
    };

    async getCartById(id) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                const carritoEncontrado = contenidoJson.find((cart) => cart.id === id);
                if (carritoEncontrado) {
                    return carritoEncontrado;
                } else {
                    throw new Error("Carrito no encontrado, inexistente");
                }
            } else {
                throw new Error("No hay carrito de compras");
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Error al obtener el carrito de compras por ID");
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const product = await productsService.getProductById(productId);
            if (!product) {
                throw new Error("El producto no existe");
            }
      
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);
                if (cartIndex !== -1) {
                    const cart = carts[cartIndex];
                    const productIndex = cart.products.findIndex((product) => product.id === productId);
                        if (productIndex === -1) {
                            cart.products.push({
                                id: productId,
                                quantity: 1
                            });
                        } else {
                            cart.products[productIndex].quantity++;
                        }
                    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
                    return cart;
                } else {
                    throw new Error("Carrito no encontrado");
                }
        } catch (error) {
            throw error;
        }
    }
    
/*    async updateCart2(cartId, updatedCart) {
        try {
          if (this.fileExist()) {
            const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
            const carts = JSON.parse(contenidoString);
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);
            if (cartIndex !== -1) {
              carts[cartIndex] = updatedCart;
              await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
            } else {
              throw new Error("Carrito no encontrado");
            }
          } else {
            throw new Error("No hay carritos de compras");
          }
        } catch (error) {
          console.error(error);
          throw new Error("Error al actualizar el carrito de compras");
        }
      }

funciona a medias
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
 funciona ---------------------------------------------------
    async addProductToCart(cartId, productId) {
        try {
          if (this.fileExist()) {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);
            if (cartIndex !== -1) {
              const cart = carts[cartIndex];
              const productIndex = cart.products.findIndex((product) => product.id === productId);
              if (productIndex === -1) {
                cart.products.push({
                  id: productId,
                  quantity: 1
                });
              } else {
                cart.products[productIndex].quantity++;
              }
              await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
              return cart;
            } else {
              throw new Error("Carrito no encontrado");
            }
          } else {
            throw new Error("No hay compras para mostrar");
          }
        } catch (error) {
          throw error;
        }
      }*/


};

