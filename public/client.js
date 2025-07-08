const socket = io()
socket.on("connect",()=>{
    console.log("connected")
})

ciprompt("")

const send  = document.getElementById("send")
const chat  = document.getElementById("chat-area")
const message = document.getElementById("message")
const mymessage = document.getElementById("my-message")

// sending messages to server on agreed event called chat-message
send.addEventListener("click",(e)=>{
    const text = message.value
    socket.emit("chat-message",text)
    const m = document.createElement("p")
    m.innerText = text
    mymessage.appendChild(m)
    message.value = ""
})


// listening to incoming messages from server from other clients and appending it 
socket.on("chat-message",(data)=>{
    console.log("received message")
    const m = document.createElement("p")
    m.innerText=data
    chat.appendChild(m)
})

