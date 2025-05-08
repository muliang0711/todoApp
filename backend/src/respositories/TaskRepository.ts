
// 1. import necessary modules and types
import { db } from '../config/db';
import { Task } from '../models/Task';
import { Result } from '../types/common';
import { User } from '../models/User';

// 2. define TaskRepository class to handle task-related database operations
export class TaskRepository {

    // 1. createTask method to insert a new task into the database
// TaskRepository.ts
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


}