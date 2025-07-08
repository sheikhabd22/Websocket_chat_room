const express = require("express");
const http = require("http");
const mongo  = require("mongoose")
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)

//databse connection
mongo.connect("mongodb://localhost:27017/chatapp",{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongodb connected")})

// mounting the web socket on the http server and accepting a socket object that acts as a unique thread for communication 
io.on("connection",(socket)=>{
    console.log("user connected.......")
    socket.on('chat-message', (data) => {
    console.log('Message from user:', data);
    // emitting message 
    socket.broadcast.emit('chat-message', data);
});
})


// server creation
server.listen(8000,()=>{
    console.log("the server is running.......")
})

// serving all the static files like indedx.html etc .....
app.use(express.static('public'));


