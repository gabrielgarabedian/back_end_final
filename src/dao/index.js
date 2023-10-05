//import { ProductManager } from "./productManagerFiles.js";
//import { CartsManagerFiles } from "./cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

import { ProductManagerMongo } from "./mongo/productsManagerMongo.js";
import {CartsManagerMongo} from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";

export const productsService =new ProductManagerMongo();
export const cartsService =new CartsManagerMongo();
export const chatService = new ChatManagerMongo();
/// de productManagers
//export const productsService =new ProductManager(path.join(__dirname,"/files/products.json"));
//export const cartsService =new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));
