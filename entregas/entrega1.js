/*class ProductManager {
    constructor(){
        this.products=[]
    };

    addProduct(title, description, price, img, stock, code){
        let newId;
           if (this.products.length===0){
                newId = 1
           } else{
                newId=this.products[this.products.length-1].id+1
           }
        if (!title || !description || !price || !img || !stock || !code){
            console.log("No se permiten campos vacios")
        } else {
            const isRegistered = this.products.some(product => product.code === code);
            if (isRegistered) {
                console.log("ERROR: código ya registrado");
            } else {
                const newProduct = {
                    id:newId,
                    title,
                    description,
                    price,
                    img,
                    stock,
                    code,
                };
                this.products.push(newProduct);
                console.log("Producto agregado exitosamente");
            }
        }
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

const listProduct = new ProductManager();
console.log(listProduct.getProducts());

// lista con nulos en cada campo
listProduct.addProduct(undefined, "comida para perro", 7500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,5656659)
listProduct.addProduct("proplan", undefined, 1500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 10,56898956659)
listProduct.addProduct("eukanuba", "comida para perro adulto", undefined, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 15,5658888886659)
listProduct.addProduct("proplan", "alimento balanceado", 7900, undefined, 9,5659998656659)
listProduct.addProduct("purina", "comida para gato", 5500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", undefined,5656659)
listProduct.addProduct("proplan cachorros", "alimento para cachorros", 17500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,undefined)

// codigos repetidos
listProduct.addProduct("dogChow", "comida para perro", 7500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,11111)
listProduct.addProduct("proplan", "alimento balanceado", 1500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 10,56898956659)
listProduct.addProduct("eukanuba", "comida para perro adulto", 8590, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 15,11111)
listProduct.addProduct("proplan", "alimento balanceado", 7900, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 9,5659998656659)
listProduct.addProduct("purina", "comida para gato", 5500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 5,5656659)
listProduct.addProduct("proplan cachorros", "alimento para cachorros", 17500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,11111)

// lista con campos completos
listProduct.addProduct("dogChow", "comida para perro", 7500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,5656659)
listProduct.addProduct("proplan", "alimento balanceado", 1500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 10,56898956659)
listProduct.addProduct("eukanuba", "comida para perro adulto", 8590, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 15,5658888886659)
listProduct.addProduct("proplan", "alimento balanceado", 7900, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 9,5659998656659)
listProduct.addProduct("purina", "comida para gato", 5500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 5,5656659)
listProduct.addProduct("proplan cachorros", "alimento para cachorros", 17500, "https://th.bing.com/th/id/OIP.mb8RbbZvvKJgGZUCXr2w0gHaHa?pid=ImgDet&rs=1", 12,151516549)

//console.log("Esta es la lista con los 6 productos con codigos diferentes:\n",listProduct)

console.log(listProduct.getProducts());

const productId = 13; //realizando la prueba con un id inexistente
const product = listProduct.getProductById(productId);

if (product) {
    console.log("Producto encontrado:", product);
} else {
    console.log("Producto no encontrado (id invalido)");
}

