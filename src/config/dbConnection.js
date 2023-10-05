import mongoose from "mongoose";

export const connectDB =async()=>{
    try {
        await mongoose.connect("mongodb+srv://gabrielgarabedianprimitiva:bacacay2428@backcoder.gcoysmc.mongodb.net/ecommerceDB?retryWrites=true&w=majority")
        console.log("Atlas DB exitoso para ecommerce")
    } catch (error) {
        console.log(`Hubo un error al conectar la base con atlas ${error.message}`)
    }
}