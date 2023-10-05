import { productsModel } from "./models/products.models.js";
//import mongoose from 'mongoose';

export class ProductManagerMongo {

    constructor(){
        this.model= productsModel;
    }

    async addProduct(product) {
        try {
            const result =await this.model.create(product);
            return result;
        } catch (error) { 
            console.log("addProduct", error.message); 
            throw new Error("No se puede CREAR el producto");
        }
    }

    async getProducts(){
        try {
            const result =await this.model.find();
            return result;
        } catch (error) {  
            console.log("getProducts", error.message);
            throw new Error("No se puede encontrar los productos");
        }    
    }

    async getProductById(id) {
        try {
            const result =await this.model.findById(id);
            return result;
        } catch (error) {  
            console.log("getProductsById", error.message);
            throw new Error("No se puede encontrar ese id de producto");
        }
    }

    async updateProduct(id, newProductsList) {
        try {
            const result = await this.model.findByIdAndUpdate(id, newProductsList, {new:true});
            if (!result) {
                throw new Error("No se puede encontrar el producto para actualizar");
            }
            return result;
        } catch (error) {
            console.log("updateProduct", error.message);
            throw new Error("No se puede actualizar el producto");
        }
    }

    async deleteProduct(id) {
        try {
            const result =await this.model.findByIdAndDelete(id);
            if(!result){
                throw new Error("No se encuentra el producto que desea Eliminar");
            }
            return result;
        } catch (error) {
            console.log("deleteProduct", error.message);
            throw new Error("No se puede Eliminar el Producto");
        }
    }
};



