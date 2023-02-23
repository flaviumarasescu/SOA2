import express , {Request, Response} from "express";
const amqp = require('amqplib')
import ListModel from "../models/list";

const {randomBytes} = require('crypto')

const router = express.Router()

router.get('/api/list', (req: Request, res:Response)=>{
    console.log('get list is working')
    ListModel.find({}, (err: any, lists: any)=>{
        if(err){
            res.send(err)
        }
        res.status(200).json(lists)
    })
})


router.post('/api/list', async (req: Request, res:Response)=>{
    console.log('list is working req.body',req.body)
    const {listName} = req.body
    const listId = randomBytes(4).toString('hex')
    const listData = {name: listName, listId}
    try{
        const newList = new ListModel({...listData})
        await newList.save()
        console.log('saved list to db')

        const connection = await amqp.connect('amqp://rabbitmq-service:5672');
        console.log('list Connected to rabbitmq')

        const channel = await connection.createChannel();
        console.log('list Created channel')

        await channel.assertExchange('list-exchange', 'topic', {durable:false})
        console.log('list Assert rabbit mq')

        await channel.publish('list-exchange', 'list', Buffer.from(JSON.stringify(listData)))

        res.status(201).send(listData)
    }catch (e){
        res.send(e)
    }
})

export {router};
