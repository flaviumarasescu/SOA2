import express , {Request, Response} from "express";
const amqp = require('amqplib')
import QueryModel from "../models/query";

const router = express.Router()

router.get('/api/query', (req: Request, res:Response)=>{
    console.log('query ffff')
    QueryModel.find({}, (err: any, data: any)=>{
        if(err){
            res.status(500).send(err)
        } else{
            console.log('data', data)
            res.status(200).send(data)
        }
    })
})

router.post('/api/query/mail', (req:Request, res:Response)=>{
    console.log('din mail api',req.body)
    const {data} = req.body
    const items: any[] = []
    data.map((el: { item: any; })=> items.push(el.item))
    const str = items.toString()
    console.log(
        'str',str
    )
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID)
    const msg = {
        to: process.env.RECEIVER, // Change to your recipient
        from: process.env.SENDER, // Change to your verified sender
        subject: 'SOA APP',
        text: str,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            // @ts-ignore
            res.send(200, { response: 'Email sent' });
        })
        .catch((error: any) => {
            console.error(error)
        })
})

export {router};
