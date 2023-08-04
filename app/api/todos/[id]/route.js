import { connectDB } from "@utils/database";
import Todos from "@models/todos";


export const GET = async (req,{params}) =>{
    try {
        await connectDB();

        const todos = await Todos.findById(params.id).populate('creator');
        if(!todos) return new Response("Todos not found!",{status:404})

        return new Response(JSON.stringify(todos),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all Todos!",{status:500})
    }
}

export const PATCH = async (req,{params})=>{
    const {title,tag,desc} = await req.json();
    try {
        await connectDB();
        const existingTodos = await Todos.findById(params.id)
        if(!existingTodos) return new Response("Todos not found!",{status:404})

        existingTodos.title = title;
        existingTodos.tag = tag;
        existingTodos.desc = desc;

        await existingTodos.save();

        return new Response(JSON.stringify(existingTodos),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all Todos!",{status:500})
    }
}

export const DELETE = async (req,{params})=>{
    try {
        await connectDB();
        await Todos.findByIdAndRemove(params.id)
        return new Response("Todo deleted successfully", {status:200})
    } catch (error) {
        return new Response("Failed to fetch all Todos!",{status:500})
    }
}