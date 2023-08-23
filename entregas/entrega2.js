const fs = require("fs");

class ProductManager {
    constructor(filePath){
        this.filePath = filePath;
    }

    fileExist(){
        //console.log("existe",this.filePath)
        return fs.existsSync(this.filePath);
        
    }
    
    async getProducts(){
        try {
            if (this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            }else{
                throw new Error ("Archivo inexistente")
            }
            
        } catch (error) {
            console.log(error.message);
            throw error;
        }        
    }

    async addProduct (producto){
        try {
            if (this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                contenidoJson.push(producto);
                await fs.promises.writeFile(this.filePath,JSON.stringify(contenidoJson,null,"\t"));
                console.log("Producto agregado correctamente");

            }else{
                throw new error ("Archivo no se pudo agregar")
            }
            
        } catch (error) {
            console.log(error.message)
            throw error;
        }
    }
}

const operations = async ()=>{
    try {
        const listProduct = new ProductManager("./entregas/listaProductos.json");
        const product = await listProduct.getProducts();
        console.log(product);
        
    } catch (error) {
        console.log(error.message);
    }
}
operations()