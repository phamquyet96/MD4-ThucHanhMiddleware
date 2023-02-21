import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import axios from "axios";
import {responseTime} from "./src/middleware/responseTime";
import routes from "./router/router";

const PORT=3000;
const app=express();

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(responseTime);
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

app.get('/home',async (req,res)=>{
    try{
        const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
        const response=await axios.get(url);
        const data=response.data;

        if(data){
            res.status(200).json(data);
        }else{
            res.end('<h1>Error</h1>')
        }

    }catch (err){
        res.end('<h1>Error</h1>')
    }
})

app.use(routes)

app.listen(PORT,()=>{
    console.log("App running on port: " + PORT)

})
