
// 1. import { Request, Response } from "express";
// 2. import { TaskManager } from "../services/TaskManager";

import { Request, Response } from "express";
import { TaskManager } from "../services/TaskManager";
import { Task } from "../models/Task";

// 3. define TaskController class to handle task-related requests
export class TaskController {
    // 1. createTask method to handle task creation requests
    static async createTask(req: Request, res: Response) {
        // 1. catch neccessary data from request body : 
        const { userId, title, description, status, type , createdAt  } = req.body;
        // 2. use TaskManager to handle the task creation logic
        const result = await TaskManager.createTask(userId, title, description, status, type , createdAt);
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the taskId   
        return res.status(201).json({ task : result.data });
    }


}