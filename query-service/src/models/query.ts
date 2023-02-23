import {Schema, model} from "mongoose"

interface Query {
    name: string;
    listId: string;
    items: [{item:string, itemId: string}]
}

const schema = new Schema<Query>({
    name: {type: String, required: true},
    listId: {type: String, required: true},
    items: { type: [{item: String, itemId: String}], required: true}
})

const QueryModel = model<Query>("Query", schema)

export default QueryModel;
