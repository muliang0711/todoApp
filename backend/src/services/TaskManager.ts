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

}
