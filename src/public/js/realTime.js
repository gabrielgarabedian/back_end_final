const socketClient = io();
const productList = document.getElementById("productList");
const createForm = document.getElementById("createForm")

createForm.addEventListener("submit",(e)=>{
    //console.log(e);
    e.preventDefault();
    const formData = new FormData(createForm)
    //console.log(formData.get("title"))
    const jsonData = {};
    for (const[key,value] of formData.entries()){
        jsonData[key]= value
    }
    jsonData.price = parseInt(jsonData.price);
    jsonData.code = parseInt(jsonData.code);
    jsonData.stock = parseInt(jsonData.stock);
    console.log(jsonData);
    socketClient.emit("addProduct", jsonData)
    createForm.reset();

})

//recibimos los prod
socketClient.on("Product Array", (dataProducts)=>{
    console.log("esta es la lista", dataProducts);
    let productElem= "";
    dataProducts.forEach(product => {
        productElem +=
        `<div id=${product.id}>
            <h2>Producto: ${product.title}</h2>
            <h3>Precio $${product.price}</h3>
            <button class="delete-button" onclick="deleteProduct(${product.id})">Eliminar<button/>  
        </div>`;
    });
    //console.log("esto", productElem);
    productList.innerHTML = productElem;
})

socketClient.on("error", (errorMessage) => {
    alert(errorMessage);
});
socketClient.on("message", (message) => {
    alert(message);
  });

function deleteProduct(productId) {
    socketClient.emit("deleteProduct", productId);
}

socketClient.on("productDeleted", (productId) => {
    const productDiv = document.querySelector(`div[data-product-id="${productId}"]`);
    productDiv.remove();
});

/*const deleteProduct(productId) {
    socketClient.emit("deleteProduct", productId);
    console.log("esto", productId);
}*/

/*createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createForm);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        if (key === "file") {
            jsonData[key] = value.name; // Guardar solo el nombre del archivo
        } else {
            jsonData[key] = value;
        }
    }

    // Convertir el objeto JSON en una cadena JSON
    const jsonString = JSON.stringify(jsonData);

    // Enviar el archivo y el objeto JSON al servidor
    socketClient.emit("addProduct", { jsonData, file: formData.get("file") });

    createForm.reset();
});*/