import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";

const PORT=3000;
const app=express();

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("common"));
app.get('/',(req,res)=>{
    res.json({
        message:"Hello!How are you?"
    })
})

app.get("/one",(req,res,next)=>{
    fs.promises.readFile('./one.txt')
        .then(data=>res.send(data))
        .catch(err=>next(err))
})

app.use((err,req,res,next)=>{
    console.error('Error 1111: ', err.type)
    if(err.type=='time-out'){res.status(408).send(err)}
    else{res.status(500).send(err)}
})

app.listen(PORT,()=>{
    console.log("App running on port: " + PORT)

})
