import express , {Request, Response} from "express";
const amqp = require('amqplib')
import ItemModel from "../models/item";

const {randomBytes} = require('crypto')

const router = express.Router()


router.get('/api/items/:listId', (req: Request, res:Response)=>{
    const listId = req.params.listId;
    ItemModel.find({listId}, (err: any, items: any)=>{
        if(err){
            res.send(err)
        }
        res.status(200).json(items)
    })
})


router.post('/api/items/:listId', async (req: Request, res:Response)=>{
    const {item} = req.body
    const itemId = randomBytes(4).toString('hex')
    const listId = req.params.listId
    const itemData = { item, itemId}
    const msg = {item, itemId, listId}

    try{
        await ItemModel.updateOne({listId}, {$push:{items:itemData}})
        console.log('item id saved to list' + listId)

        const connection = await amqp.connect('amqp://rabbitmq-service:5672');
        console.log('item api Connected to rabbitmq')

        const channel = await connection.createChannel();
        console.log('item Created channel')

        await channel.assertExchange('list-exchange', 'topic', {durable:false})
        console.log('item exchange created')

        await channel.publish('list-exchange', 'item', Buffer.from(JSON.stringify(msg)))
        console.log('item published')
        res.status(201).send(msg)
    }catch (e){
        res.send(e)
    }
})

export {router};
