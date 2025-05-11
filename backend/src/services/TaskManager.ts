// 1. import necessary modules and types

import { Task } from '../models/Task';
import { Result } from '../types/common';
import { UserRepository } from '../respositories/UserRepository';
import { TaskRepository } from '../respositories/TaskRepository';

// 2. define TaskManager class to handle task-related business logic
export class TaskManager {

    // 1. createTask method to create a new task
    static async createTask(    
        userid : number,
        title: string,
        description: string,
        status: "incompleted" | "completed",
        type: string,
        createdAt?: Date

    ): Promise<Result<Task>> {
        // 1. check if user exists
        const userExists = await UserRepository.findById(userid);
       if (!userExists.success || !userExists.data) {
            return {
                success: false,
                error: "User not found."
            };
        }

        // 2. create new task
        const task = new Task(
            0, // id is auto-incremented in the database
            userid , 
            title ,
            description ,
            status , 
            type,
            createdAt ? createdAt : new Date() ,
        );

        // 3. try saving task
        const TaskSavingResult = await TaskRepository.createTask(task);


        // 4. return result
        if (!TaskSavingResult.success) {
            return {
                success: false,
                error: "Failed to create task."
            };
        }
        // 5. return task
        return {
            success: true,
            data: TaskSavingResult.data
        };
        

    }

    // 2. deleteTask method to delete a task by its ID
    static async deleteTask(taskId: number): Promise<Result<string | undefined>> {
        // 1. check if task exists
        const taskExists = await TaskRepository.findTaskById(taskId);
        if (!taskExists.success || !taskExists.data) {
            return {
                success: false,
                error: "Task not found."
            };
        }
        // 2. delete task
        const result = await TaskRepository.deleteTask(taskId);

        // 3. check if deletion was successful
        if(!result.success){
            return {
                success : false , 
                error : "Failed to delete task."
            }
        }

        // 4. else the task was deleted successfully
        return {
            success : true ,
            data : "Task deleted successfully."
        };
    }

}
