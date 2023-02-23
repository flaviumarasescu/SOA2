import {Schema, model} from "mongoose"

interface List {
    name: string;
    listId: string;
}

const schema = new Schema<List>({
    name: {type: String, required: true},
    listId: {type: String, required: true},
})

const ListModel = model<List>("List", schema)

export default ListModel;
