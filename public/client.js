const socket = io()
socket.on("connect",()=>{
    console.log("connected")
})


const send  = document.getElementById("send")
const chat  = document.getElementById("chat-area")

const message = document.getElementById("message")
send.addEventListener("click",(e)=>{
    const text = message.value
    socket.emit("chat-message",text)
    message.value = ""
})


socket.on("chat-message",(data)=>{
    console.log("received message")
    const m = document.createElement("p")
    m.innerText=data
    chat.appendChild(m)
})

