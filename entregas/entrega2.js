/*const fs = require("fs");

class ProductManager {
    constructor(filePath){
        this.filePath = filePath;
    }

    fileExist(){
        return fs.existsSync(this.filePath);
    }
    
    async getProducts(){
        try {
            if (this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            } else {
                throw new Error("Archivo inexistente");
            }
            
        } catch (error) {
            console.log(error.message);
            throw error;
        }        
    }

    async addProduct(title, description, price, img, stock, code){
        try {
            if (this.fileExist()){
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                const newId = contenidoJson.length > 0 ? contenidoJson[contenidoJson.length - 1].id + 1 : 1;
                
                if (!title || !description || !price || !img || !stock || !code){
                    console.log("No se permiten campos vacíos");
                } else {
                    const isRegistered = contenidoJson.some(product => product.code === code);
                    if (isRegistered) {
                        console.log("ERROR: código ya registrado");
                    } else {
                        const newProduct = {
                            id: newId,
                            title,
                            description,
                            price,
                            img,
                            stock,
                            code,
                        };
                        contenidoJson.push(newProduct);
                        await fs.promises.writeFile(this.filePath, JSON.stringify(contenidoJson, null, "\t"));
                        console.log("Producto agregado exitosamente");
                    }
                }
            } else {
                throw new Error("El articulo no se pudo agregar");
            }
            
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                const productoEncontrado = contenidoJson.find(producto => producto.id === id);
                if (productoEncontrado) {
                    return productoEncontrado;
                } else {
                    throw new Error("Producto no encontrado");
                }
            } else {
                throw new Error("Archivo inexistente");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                let contenidoJson = JSON.parse(contenido);
                
                contenidoJson = contenidoJson.map(producto => {
                    if (producto.id === id) {
                        return {
                            ...producto,
                            ...updatedFields,
                            id: producto.id // Mantiene el ID original 
                        };
                    }
                    return producto;
                });
                
                await fs.promises.writeFile(this.filePath, JSON.stringify(contenidoJson, null, "\t"));
                console.log("Producto actualizado exitosamente");
            } else {
                throw new Error("Archivo inexistente");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
                let contenidoJson = JSON.parse(contenido);
    
                const updatedProducts = contenidoJson.filter(producto => producto.id !== id);
    
                await fs.promises.writeFile(this.filePath, JSON.stringify(updatedProducts, null, "\t"));
                console.log("Producto eliminado exitosamente");
            } else {
                throw new Error("Archivo inexistente");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const operations = async () => {
    try {
        const listProduct = new ProductManager("./entregas/listaProductos.json");

        // Ejemplo:
        const product = await listProduct.getProducts();
        console.log(product);

        /*const product = await listProduct.addProduct("Nuevo producto", "Descripción del nuevo producto", 10, "imagen.jpg", 5, "123456");
        console.log(product);

        const product = await listProduct.addProduct("Nuevo producto2", "Descripción del nuevo producto", 10, "imagen.jpg", 5, "125583456");
        console.log(product);
        
        const product = await listProduct.getProductById(1);
        console.log(product);
        
        const product = await listProduct.updateProduct(1, { price: 15 });
        console.log(product);
        
        const product = await listProduct.deleteProduct(1);
        console.log(product);
        
    } catch (error) {
        console.log(error.message);
    }
}
operations();*/
