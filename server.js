import express from "express"
import mongoose from "mongoose"
import Cards from './dbcards.js';
import Cors from 'cors';
//App Config
const app=express();
const port=process.env.PORT ||8001;
const connection_url=`mongodb+srv://admin:O1f1p7YDUEG1M7Mq@cluster0.9nqxc.mongodb.net/tinderdb?retryWrites=true&w=majority`
//Middlewares
app.use(express.json())
app.use(Cors())
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
//API endpoint
app.get("/",(req,res) => res.status(200).send("Hello Sadek!!"));
app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});
app.get('/tinder/cards',(req,res)=>{
    
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});

//Listener
app.listen(port,()=>console.log(`Listening on localhost: ${port}`));