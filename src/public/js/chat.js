const socketChat = io();

const userName = document.getElementById("userName");
const inputMsg = document.getElementById("inputMsg");
const sendMsg = document.getElementById("sendMsg");
const chatPanel = document.getElementById("chatPanel");

let user;
Swal.fire({
    title:'CHAT',
    text: 'Por favor ingresa tu usuario',
    input: 'text',
    inputValidator: (value)=>{
        return !value && 'No ingresaste un nombre de usuario'
    },
    allowOutsideClick:false,
    allowEscapeKey:false,
}).then ((inputValue)=>{
    console.log(inputValue);
    user = inputValue.value;
    userName.innerHTML = user;
    socketChat.emit("authenticated", user)
});

sendMsg.addEventListener("click",()=>{
    const message = inputMsg.value
    if (message) {
        const msg = { user: user, message: message };
        socketChat.emit("msgChat", msg);
        inputMsg.value = "";
    } else {
        Swal.fire({
            title: "Error",
            text: "No puedes enviar un mensaje vacío",
            icon: "error",
            timer: 2000, // Duración del mensaje en milisegundos
            showConfirmButton: false
        });
    }
})

socketChat.on("chatHistory", (dataServer)=>{
    console.log(dataServer);
    let msgPanel = "";
    dataServer.forEach(element => {
        msgPanel += `<p> User ${element.user} >>> ${element.message}<p>`
    });
    chatPanel.innerHTML= msgPanel;
})

socketChat.on("newUser",(data)=>{
    if(user){
        Swal.fire({
            text: data,
            toast: true,
            position:"top-right"
        })
    }
});

