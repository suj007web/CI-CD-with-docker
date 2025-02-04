import { db } from "../db/db";
import { Request, Response } from "express";
import { todoTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createTodo(req : Request, res : Response) : Promise<void> {
    try{
        const {title, description} = req.body;
        if(!title || !description){
            res.status(400).json({
                message : "Title and description are required",
                success : false,
                data : null
            })
            return;
        }
    await db.insert(todoTable).values({
        title,
        description
    })  
    res.status(201).json({
        message : "Todo created successfully",
        success : true,
        data : {
            title,
            description
        }
    })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Internal server error",
            success : false,
            data : null
        })
    }

}

export async function getAllTodos(req:Request, res:Response) : Promise<void>{
    try{
        const todos = await db.select().from(todoTable);
        res.status(200).json({
            message : "Todos fetched successfully",
            success : true,
            data : todos
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Internal server error",
            success : false,
            data : null
        })
    }
}

export async function getTodo(req:Request, res:Response) : Promise<void>{
    try{
        const {id} = req.params;
        const todo = await db.select().from(todoTable).where(eq(todoTable.id, parseInt(id)))
        if(!todo){
            res.status(404).json({
                message : "Todo not found",
                success : false,
                data : null
            })
            return;
        }
        res.status(200).json({
            message : "Todo fetched successfully",
            success : true,
            data : todo
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Internal server error",
            success : false,
            data : null
        })
    }
}

export async function updateTodo(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updateFields: Partial<{ title: string; description: string; completed: number }> = {};

        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;
     
        if (Object.keys(updateFields).length === 0) {
             res.status(400).json({
                message: "At least one field (title, description, completed) is required for update",
                success: false,
                data: null
            });
        }

        await db.update(todoTable).set(updateFields).where(eq(todoTable.id, parseInt(id, 10)));

        res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            data: updateFields
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            data: null
        });
    }
}

export async function deleteTodo(req:Request, res:Response):Promise<void> {
    try{
        const {id} = req.params;
        await db.delete(todoTable).where(eq(todoTable.id, parseInt(id)));
        res.status(200).json({
            message : "Todo deleted successfully",
            success : true,
            data : null
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Internal server error",
            success : false,
            data : null
        })
    }
}