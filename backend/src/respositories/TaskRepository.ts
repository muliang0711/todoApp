
// 1. import necessary modules and types
import { db } from '../config/db';
import { Task } from '../models/Task';
import { Result } from '../types/common';
import { User } from '../models/User';

// 2. define TaskRepository class to handle task-related database operations
export class TaskRepository {

    // 1. createTask method to insert a new task into the database
    static async createTask(task: Task): Promise<Result<Task>> {
        try {
            const sql = `INSERT INTO tasks (user_id, title, description, status, type, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await db.execute(sql, [
                task.getUserId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getType(),
                task.getCreatedAt()
            ]);


            return {
                success: true,
                data: task
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to insert task: ${error.message}`
            };
        }
    }
    // 2. deleteTask method to delete a task from the database
    static async deleteTask(taskId: number): Promise<Result<void>> {
        try {
            const sql = `DELETE FROM tasks WHERE id = ?`;
            await db.execute(sql, [taskId]);
            return {
                success: true,
                data: undefined
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to delete task: ${error.message}`
            };
        }
    }
    // 3. updateTask method to update an existing task in the database
    static async updateTask(task: Task): Promise<Result<Task>> {
        try {
            const sql = `UPDATE tasks SET title = ?, description = ?, status = ?, type = ? WHERE id = ?`;
            await db.execute(sql, [
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getType(),
                task.getId()
            ]);
            return {
                success: true,
                data: task
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to update task: ${error.message}`
            };
        }
    }
    // 4. getAllTasks method to fetch all tasks for a specific user
    static async getAllTasksByUserId(user_id : number): Promise<Result<Task[]>> {
        try {
            const sql = `SELECT * FROM tasks WHERE user_id = ?`;
            const [rows] = await db.execute(sql, [user_id]); 
            const tasks: Task[] = (rows as any[]).map(row => new Task(
                row.id,
                row.title,
                row.description,
                row.status,
                row.type,
                row.created_at
            ));
            return {
                success: true,
                data: tasks
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to fetch tasks: ${error.message}`
            };
        }
    }
    // 5. getTask by this day : 
    static async getTaskByDate(user_id : number, date: Date): Promise<Result<Task[]>> {
        try {
            const sql = `SELECT * FROM tasks WHERE user_id = ? AND DATE(created_at) = DATE(?)`;
            const [rows] = await db.execute(sql, [user_id, date]); // Replace with actual user ID
            const tasks: Task[] = (rows as any[]).map(row => new Task(
                row.id,
                row.title,
                row.description,
                row.status,
                row.type,
                row.created_at
            ));
            return {
                success: true,
                data: tasks
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to fetch tasks by date: ${error.message}`
            };
        }
    }
    // 6. getTaskInProgress method to fetch all tasks in progress for a specific user
    static async getTaskInProgress(user_id : number):Promise<Result<Task[]>>{

        try{
            // 1. sql query to get all tasks in progress
            const sql = `SELECT * FROM tasks WHERE user_id = ? AND status = 'incompleted'`;
            // 2. use prepared statement to prevent sql injection
            const [rows] = await db.execute(sql, [user_id]); // Replace with actual user ID
            // 3. map the rows to Task objects
            const tasks: Task[] = (rows as any[]).map(row => new Task(
                row.id,
                row.title,
                row.description,
                row.status,
                row.type,
                row.created_at
            ));
            // 4. return the tasks
            return {
                success: true,
                data: tasks
            };
        }catch(error : any){
            return {
                success: false,
                error: `Failed to fetch tasks in progress: ${error.message}`
            };
        }
    }
    // 7. getTaskInCompleted method to fetch all tasks in completed for a specific user
    static async getTaskInCompleted(user_id : number):Promise<Result<Task[]>>{
        // 1. sql query to get all tasks in completed
        try{
            const sql = `SELECT * FROM tasks WHERE user_id = ? AND status = 'completed'`;
            // 2. use prepared statement to prevent sql injection
            const [rows] = await db.execute(sql, [user_id]); // Replace with actual user ID
            // 3. map the rows to Task objects
            const tasks : Task[] = (rows as any[]).map(rows => new Task(
                rows.id,
                rows.title,
                rows.description,
                rows.status,
                rows.type,
                rows.created_at
            ));
            // 4. return the tasks
            return {
                success: true,
                data: tasks
            };
        }catch(error : any){
            // 5. return error if failed
            return {
                success: false,
                error: `Failed to fetch tasks in completed: ${error.message}`
            };
        }
    }
    // 8. findTaskById method to fetch a task by its ID
    static async findTaskById(taskId: number): Promise<Result<Task>> {
        try {
            const sql = `SELECT * FROM tasks WHERE id = ?`;
            const [rows] = await db.execute(sql, [taskId]);
            if ((rows as any[]).length === 0) {
                return {
                    success: false,
                    error: "Task not found."
                };
            }
            const row = (rows as any[])[0];
            const task = new Task(
                row.id,
                row.title,
                row.description,
                row.status,
                row.type,
                row.created_at
            );
            return {
                success: true,
                data: task
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Failed to fetch task by ID: ${error.message}`
            };
        }
    }
}