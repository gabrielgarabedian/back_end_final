import { ProductManager } from "./productManagerFiles.js";
import { CartsManagerFiles } from "./cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsService =new ProductManager(path.join(__dirname,"/files/products.json"));
export const cartsService =new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));
