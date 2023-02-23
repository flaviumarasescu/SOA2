import express from "express";
const amqp = require("amqplib");

import mongoose from "mongoose";
import QueryModel from "./models/query";
import { router } from "./routes/routes";

const bodyParser = require('body-parser')
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.json());
app.use(router)

async function processItemMessage(msg: { content: { toString: () => any } }) {
  console.log("din qurty processItemMessage", msg);
  const content = JSON.parse(msg.content.toString());
  const { item, itemId, listId } = content;


  const itemData = {
    item,
    itemId,
  };

  await mongoose
    .model("Query")
    .updateOne({ listId }, { $push: { items: itemData } });
  console.log("saved item to db itemData", itemData);
}

async function processListMessage(msg: { content: { toString: () => any } }) {
  const content = JSON.parse(msg.content.toString());
  console.log("din query content processListMessage", content);
  const { name, listId } = content;
  console.log("name", name);
  console.log("listId", listId);

  const queryData = {
    name,
    listId,
    items: [],
  };

  try {
    const newQuery = new QueryModel({ ...queryData });
    await newQuery.save();
    console.log("Saved list to db", queryData);
  } catch (e) {
    console.log(e);
  }
}

const Startup = async () => {
  try {
    const database = await mongoose.connect(
      "mongodb://query-mongo-service:27017/query"
    );
    console.log("query", database.connection.host);
    console.log("connected to mongo");
    // const amqpConnection =  await amqp.connect('amqp://rabbitmq-service:5672', "heartbeat=60");
    const amqpConnection = await amqp.connect(
      "amqp://rabbitmq-service:5672",
      "heartbeat=60"
    );
    console.log("querocessing item message din quqq");

    const channel = await amqpConnection.createChannel();
    await channel.assertExchange("list-exchange", "topic", { durable: false });
    console.log("exhance create");

    await channel.assertQueue("query-item-queue", { durable: false });
    await channel.bindQueue("query-item-queue", "list-exchange", "item.#");
    await channel.consume(
      "query-item-queue",
      async (msg: { content: { toString: () => any } }) => {
        console.log("processing item message din query", msg);
        await processItemMessage(msg);
        await channel.ack(msg);
      },
      { noAck: false }
    );

    await channel.assertQueue("query-list-queue", { durable: false });
    await channel.bindQueue("query-list-queue", "list-exchange", "list.#");
    await channel.consume(
      "query-list-queue",
      async (msg: { content: { toString: () => any } }) => {
        console.log("processing list message ");
        await processListMessage(msg);
        await channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (e) {
    console.log(e);
  }
};

app.listen(5002, () => {
  console.log("query-Service listening on port 5002 !!!!");
});

Startup();
