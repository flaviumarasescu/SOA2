import express from 'express';
import mongoose from 'mongoose';
import { router } from "./routes/routes";
const bodyParser = require('body-parser')
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.json());
app.use(router)

const Startup = async ()=>{
    console.log('startup list')
    try{
        const database = await mongoose.connect('mongodb://list-mongo-service:27017/list')
        console.log('connected to mongo list', database.connection.host)
    }catch (e){
        console.log(e)
    }
}

app.listen(5000, ()=>{
    console.log('List-Service listening on port 5000 !!!!')
})

Startup();
