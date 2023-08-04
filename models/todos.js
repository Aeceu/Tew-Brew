import {Schema,model,models} from "mongoose";

const TodosSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    tag:{
        type:String,
        required:[true, "Tag is required"]
    },
    desc:{
        type:String,
        required:[true, "description  is required"]
    }
})

const Todos = models.Todos || model("Todos",TodosSchema);
export default Todos;