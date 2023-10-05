import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    code:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        enum:["Ropa","Alimento", "Salud", "Belleza"]
    },
    thumbnail:String,
})

export const productsModel = mongoose.model(productsCollection, productSchema);