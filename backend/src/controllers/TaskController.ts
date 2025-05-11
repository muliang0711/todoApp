
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

    // 2. deleteTask method to handle task deletion requests
    static async deleteTask(req: Request, res: Response) {
        // 1. catch taskId from request params
        const { taskId } = req.params;
        // 2. use TaskManager to handle the task deletion logic
        const result = await TaskManager.deleteTask(parseInt(taskId));
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the taskId   
        return res.status(200).json({ message: "Task deleted successfully" });
    }

    // 3. updateTask method to handle task update requests
    static async updateTask(req: Request, res: Response) {
        // 1. catch taskId from request params
        const { taskId } = req.params;
        // 2. catch task data from request body
        const { userId, title, description, status, type } = req.body;
        // 3. create a new Task object with the updated data
        const task = new Task(
            parseInt(taskId),
            userId ,
            title,
            description,
            status,
            type
        );
        // 4. use TaskManager to handle the task update logic
        const result = await TaskManager.updateTask(task);
        // 5. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 6. if success, return the taskId   
        return res.status(200).json({ message: "Task updated successfully" });
    }

    // 4. getAllTasks method to handle task retrieval requests
    static async getAllTasksByUserId(req: Request, res: Response) {
        // 1. catch userId from request params
        const { userId } = req.params;
        // 2. use TaskManager to handle the task retrieval logic
        const result = await TaskManager.getAllTasksByUserId(parseInt(userId));
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the tasks   
        return res.status(200).json({ tasks: result.data });
    }

    // 5. getTaskByDate method to handle task retrieval by date requests
    static async getTaskByDate(req: Request, res: Response) {
        // 1. catch userId and date from request params
        const { userId, date } = req.params;
        // since the date is now in string format , we need to convert it to date format
        const dateObj = new Date(date);
        // 2. check if the date is valid or not
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }
        // 2. use TaskManager to handle the task retrieval by date logic
        const result = await TaskManager.getTaskByDate(parseInt(userId), dateObj);
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the tasks   
        return res.status(200).json({ tasks: result.data });
    }

    // 6. getTaskInProgress method to handle task retrieval in progress requests
    static async getTaskInProgress(req: Request, res: Response) {
        // 1. catch userId from request params
        const { userId } = req.params;
        // 2. use TaskManager to handle the task retrieval in progress logic
        const result = await TaskManager.getTaskInProgress(parseInt(userId));
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the tasks   
        return res.status(200).json({ tasks: result.data });
    }

    // 7. getTaskInCompleted method to handle task retrieval in completed requests
    static async getTaskInCompleted(req: Request, res: Response) {
        // 1. catch userId from request params
        const { userId } = req.params;
        // 2. use TaskManager to handle the task retrieval in completed logic
        const result = await TaskManager.getTaskInCompleted(parseInt(userId));
        // 3. check if the result is success or not
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        // 4. if success, return the tasks   
        return res.status(200).json({ tasks: result.data });
    }

    
}