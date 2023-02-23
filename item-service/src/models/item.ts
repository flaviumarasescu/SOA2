import {Schema, model} from "mongoose"

interface Item {
    listId: string;
    items: [{item:string, itemId: string}];
}

const schema = new Schema<Item>({
    listId: {type: String, required: true},
    items: [{item: String, itemId: String}],
})

const ItemModel = model<Item>("Item", schema)

export default ItemModel;
