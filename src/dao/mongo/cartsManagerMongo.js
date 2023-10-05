import { productsService } from "../index.js";
import { cartsModel } from "./models/carts.models.js";

export class CartsManagerMongo {
    constructor() {
        this.model = cartsModel;
    }

    async addCart() {
        try {
            const carts = await this.model.find();
            const lastCart = carts[carts.length - 1];
            const newId = lastCart ? lastCart.id + 1 : 1;
            const newCart = {
                id: newId,
                products: []
            };
            await this.model.create(newCart);
            return newCart;
        } catch (error) {
            throw new Error("No se puede agregar el carrito");
        }
    }

    async getCarts() {
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            throw new Error("No se pueden encontrar los carritos de compras");
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.model.findById(id);
            if (cart) {
                return cart;
            } else {
                throw new Error("Carrito no encontrado");
            }
        } catch (error) {
            throw new Error("Error al obtener el carrito de compras por ID");
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const product = await productsService.getProductById(productId);
            if (!product) {
                throw new Error("El producto no existe");
            }

            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const productIndex = cart.products.findIndex((product) => product.id === productId);
            if (productIndex === -1) {
                cart.products.push({
                    id: productId,
                    quantity: 1
                });
            } else {
                cart.products[productIndex].quantity++;
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}



