import { chatModel } from "./models/chat.models.js";

export class ChatManagerMongo{
    constructor(){
        this.model= chatModel;
    }

    //crear el mensaje
    async addMessage(messageInfo) {
        try {
            const result =await this.model.create(messageInfo);
            return result;
        } catch (error) { 
            console.log("addMessage", error.message); 
            throw new Error("No se puede enviar el Mensaje");
        }
    }

    //trae los mensajes
    async getMessage(){
        try {
            const result =await this.model.find();
            return result;
        } catch (error) {  
            console.log("getMessage", error.message);
            throw new Error("No se encuentra Historial de mensajes");
        }    
    }
}