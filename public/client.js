const socket = io()
socket.on("connect",()=>{
    console.log("connected")
})


const send  = document.getElementById("send")
const message = document.getElementById("message")
send.addEventListener("click",(e)=>{
    const text = message.value
    socket.emit("chat-message",text)
    message.value = ""

})