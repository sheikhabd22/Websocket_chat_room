const express = require("express");
const http = require("http");
const mongo  = require("mongoose")
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const User = require('./models/user.js');
const encrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
app.use(express.json());
require("dotenv").config()


//databse connection
mongo.connect("mongodb://localhost:27017/chatapp",{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongodb connected")})

// mounting the web socket on the http server and accepting a socket object that acts as a unique thread for communication 
io.on("connection",(socket)=>{
    try{
        const token = socket.handshake.auth.token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        socket.user = decoded
        console.log("user connected.......")
        socket.on('chat-message', (data) => {
        console.log('Message from user:', data);
        // emitting message 
        socket.broadcast.emit('chat-message', data);
});
    }
    catch{
        socket.emit('unauthorized')
        socket.disconnect()
    }

})


// server creation
server.listen(8000,()=>{
    console.log("the server is running.......")
})

// serving all the static files like indedx.html etc .....
app.use(express.static('public'));



// user auth

//register user
app.post("/register",(async(req,res)=>{
    try{
        const {username,password}  = req.body
        const existingUser = await User.findOne({username})
        if (existingUser){
            return res.status(409).json({message:"Username already exists"})
        }
        const hashpass = await encrypt.hash(password,10)
        await User.create({username,hashpass})
        res.status(201).json({ message: "User registered successfully" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });

    }

}))

app.post("/login",(async(req,res)=>{
    try{
        const {username,password}  = req.body
        const user = await User.findOne({ username });
        if(!user){
            return res.status(409).json({message:"Username already exists"})
        }
        else{
            const match = await encrypt.compare(password, user.passwordHash);
            if (match){
                const token = jwt.sign({username:user.username},process.env.JWT_SECRET)
                return res.status(200).json({message:"login successful",token})
            }
            else{
                return res.status(401).json({message:"could not login"})
            }
            
        }
        

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });

    }

}))

app.post("/verify",async(req,res)=>{
    try{
        const {token} = req.body
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if (decoded){
            return res.status(200).json({message:"Token is Valid",user:decoded})
        }
    }
    catch{
       return res.status(401).json({ message: "Invalid token" });
    }
})



