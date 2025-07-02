const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("user connected")
})
server.listen(8000,()=>{
    console.log("the server is running ")
})

app.use(express.static('public'));


