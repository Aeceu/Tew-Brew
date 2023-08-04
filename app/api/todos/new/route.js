import { connectDB } from "@utils/database";
import Todos from "@models/todos";

export const POST = async (req,res)=>{
    const {userId,title,tag,desc} = await req.json();
    try {
        await connectDB();
        const newTodos = new Todos({
            creator:userId,
            title,
            tag,
            desc
        })
        await newTodos.save();
        return new Response(JSON.stringify(newTodos),{
            status:201
        })
    } catch (error) {
        return new Response("Failed to create a new todos!",{status:500})
    }
}