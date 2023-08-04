import { connectDB } from "@utils/database";
import Todos from "@models/todos";


export const GET = async (req,{params}) =>{
    try {
        await connectDB();

        const todos = await Todos.find({
            creator:params.id
        }).populate('creator');
        return new Response(JSON.stringify(todos),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all data",{status:500})
    }
}