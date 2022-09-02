// const httpModule=require("http")

// httpModule.createServer((request,response)=>{
//     // console.log(response);  
//     response.writeHead(200,{"Content-Type":"text/plain"});
//     response.end("Node js server is up and running!")
// }).listen(9000,()=>{console.log("Server runs on the port 9000")})

// 'use strict'
let express=require("express");
let application=express();
let PORT=9000;
let socket=require("socket.io")
let fs=require('fs')

let server=application.listen(process.env.PORT || PORT)

    

let io=socket(server,{
    cors:{
        origin:"*"
    }
})


io.on("connection",(socketData)=>{
    socketData.on("SENDDATA",()=>{
        fs.readFile('alldata.json',(err,data)=>{
            if(err)throw err
            let actualData=JSON.parse(data);
            socketData.emit("DATASENT",actualData)
        })
    })
    socketData.on("SENDHOMEDATA",()=>{
        fs.readFile('homedata.json',(err,data)=>{
            if(err)throw err
            let actualData=JSON.parse(data);
            socketData.emit("HOMEDATASENT",actualData)
        })
    })
})


application.get("/",(req,res)=>{
    res.send("Hey there!")
})
