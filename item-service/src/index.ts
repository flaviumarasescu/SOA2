import express from 'express'
import mongoose from 'mongoose';
const amqp = require('amqplib')
import {router} from "./routes/routes";
import ItemModel from "./models/item";
const bodyParser = require('body-parser')
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(express.json());
app.use(router)

async function processListMessage(msg: {content: {toString:()=>any;}; }){
    console.log('processListMessage list')
    const content= JSON.parse(msg.content.toString())
    const {listId} = content;
    console.log('content',content)
    console.log('listId',listId)

    const itemData = {
        listId,
        items: []
    }

    try{
        const newItem = new ItemModel({...itemData})
        await newItem.save();
        console.log('Saved item to db')
    }catch (e) {
        console.log(e)
    }
}

const Startup = async ()=>{
    try{
        const database = await mongoose.connect('mongodb://item-mongo-service:27017/item')

        console.log('connected to mongo item', database.connection.host)
        const amqpConnection =  await amqp.connect('amqp://rabbitmq-service:5672', "heartbeat=60");
        console.log('item connecte dto rabbitmqq')

        const channel = await amqpConnection.createChannel()
        await channel.assertExchange('list-exchange', 'topic', {durable:false})
        console.log('item exhance create')


        await channel.assertQueue('items-list-queue', {durable:false})
        await channel.bindQueue('items-list-queue', 'list-exchange', 'list.#');
        await channel.consume('items-list-queue', async (msg: {content: {toString: ()=>any;}; }) =>{
            console.log('item processing message', msg)
            await processListMessage(msg)
            await channel.ack(msg)
        }, {noAck: false})

    }catch (e){
        console.log(e)
    }
}

app.listen(5001, ()=>{
    console.log('item-Service listening on port 5001 !!!!')
})

Startup();
