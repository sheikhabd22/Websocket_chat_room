const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const io = re
const app = express();
const server = http.createServer(app);
server.listen(8000,()=>{
    console.log("the server is running ")
})

app.use(express.static('public'));


