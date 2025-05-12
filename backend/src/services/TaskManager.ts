// 1. import necessary modules and types

import { Task } from '../models/Task';
import { Result } from '../types/common';
import { TaskRepository } from '../respositories/TaskRepository';
import { UserManager } from './UserManager';
// 2. define TaskManager class to handle task-related business logic
export class TaskManager {

    // 1. createTask method to create a new task
    static async createTask(
        userid: number,
        title: string,
        description: string,
        status: "incompleted" | "completed",
        type: string,
        createdAt?: Date

    ): Promise<Result<Task>> {
        // 1. check if user exists
        const userExists = await UserManager.findUserById(userid);
        if (!userExists.success || !userExists.data) {
            return {
                success: false,
                error: `${userExists.error}`
            };
        }

        // 2. create new task
        const task = new Task(
            0, // id is auto-incremented in the database
            userid,
            title,
            description,
            status,
            type,
            createdAt ? createdAt : new Date(),
        );

        // 3. try saving task
        const TaskSavingResult = await TaskRepository.createTask(task);


        // 4. return result
        if (!TaskSavingResult.success) {
            return {
                success: false,
                error: `${TaskSavingResult.error}`
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
                error: `${taskExists.error}`
            };
        }
        // 2. delete task
        const result = await TaskRepository.deleteTask(taskId);

        // 3. check if deletion was successful
        if (!result.success) {
            return {
                success: false,
                error: `${result.error}`
            }
        }

        // 4. else the task was deleted successfully
        return {
            success: true,
            data: "Task deleted successfully."
        };
    }

    // 3. updateTask method to update a task by its ID
    static async updateTask(task: Task): Promise<Result<Task>> {
        // 1. check if task exists
        const TasksExists = await TaskRepository.findTaskById(task.getId());
        // 2. if not found, return error
        if (!TasksExists.success || !TasksExists.data) {
            return {
                success: false,
                error: "Task not found."
            };
        }
        // 3. update task
        const result = await TaskRepository.updateTask(task);
        // 4. check if update was successful
        if (!result.success) {
            return {
                success: false,
                error: "Failed to update task."
            };
        }
        // 5. else the task was updated successfully
        return {
            success: true,
            data: result.data
        };
    }
    // 4. Get all tasks by userId
    static async getAllTasksByUserId(userId: number): Promise<Result<Task[]>> {
        // 1. check if user exists
        try {
            const userExists = await UserManager.findUserById(userId);
            if (!userExists.success || !userExists.data) {
                return {
                    success: false,
                    error: `${userExists.error}`
                };
            }

            // 2. get all tasks by userId
            const result = await TaskRepository.getAllTasksByUserId(userId);

            // 3. check if result is success or not
            if (!result.success) {
                return {
                    success: false,
                    error: ` Error happend on db : ${result.error}`
                };
            }

            // 4. return tasks
            return {
                success: true,
                data: result.data
            };
        }catch (error: any) {
            return {
                success: false,
                error: `Failed to fetch tasks by userId: ${error.message}`
            };
        }
    }

    // 5. getTaskByDate method to get all tasks by userId and date
    static async getTaskByDate(userId: number, date: Date): Promise<Result<Task[]>> {
        // 1. check if user exists
        const userExists = await UserManager.findUserById(userId);
        if (!userExists.success || !userExists.data) {
            return {
                success: false,
                error: `${userExists.error}`
            };
        }

        // 2. get all tasks by userId and date
        const result = await TaskRepository.getTaskByDate(userId, date);

        // 3. check if result is success or not
        if (!result.success) {
            return {
                success: false,
                error: ` Error happend on db : ${result.error}`
            };
        }

        // 4. return tasks
        return {
            success: true,
            data: result.data
        };
    }

    // 6. getTaskInProgress method to get all tasks in progress by userId
    static async getTaskInProgress(userId: number): Promise<Result<Task[]>> {

        // 1. check if user exists
        const userExists = await UserManager.findUserById(userId);
        if (!userExists.success || !userExists.data) {
            return {
                success: false,
                error: `${userExists.error}`
            };
        }
        // 2. get all tasks in progress by userId
        const result = await TaskRepository.getTaskInProgress(userId);
        // 3. check if result is success or not
        if (!result.success) {
            return {
                success: false,
                error: ` Error happend on db : ${result.error}`
            };
        }
        // 4. return tasks
        return {
            success: true,
            data: result.data
        };

    }

    // 7. getTaslsInCompleted method to get all tasks in completed by userId
    static async getTaskInCompleted(userId: number): Promise<Result<Task[]>> {
        // 1. check if user exists
        const userExists = await UserManager.findUserById(userId);
        if (!userExists.success || !userExists.data) {
            return {
                success: false,
                error: `${userExists.error}`
            };
        }
        // 2. get all tasks in completed by userId
        const result = await TaskRepository.getTaskInCompleted(userId);
        // 3. check if result is success or not
        if (!result.success) {
            return {
                success: false,
                error: ` Error happend on db : ${result.error}`
            };
        }
        // 4. return tasks
        return {
            success: true,
            data: result.data
        };

    }


}
