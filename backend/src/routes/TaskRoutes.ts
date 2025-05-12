import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { sessionCheckMiddleware } from "../middlewares/sessionCheckMiddleware";

// 1. Create a router instance
const router = Router();
// 2. Define routes for task-related operations :

// 1. POST /api/tasks/create - Create a new task
router.post("/create", sessionCheckMiddleware, TaskController.createTask);
// 2. DELETE /api/tasks/delete/:taskId - Delete a task
router.delete("/delete/:taskId", sessionCheckMiddleware, TaskController.deleteTask);
// 3. POST /api/tasks/update - Update an existing task
router.post("/update/:taskId", sessionCheckMiddleware, TaskController.updateTask);
// 4. GET /api/tasks/getAll - Get all tasks
router.get("/getAll", sessionCheckMiddleware, TaskController.getAllTasksByUserId);
// 5. GET /api/tasks/getTaksInProgress - Get tasks in progress
router.get("/getInProgress", sessionCheckMiddleware, TaskController.getTaskInProgress);
// 6. GET /api/tasks/getCompleted - Get completed tasks
router.get("/getCompleted", sessionCheckMiddleware, TaskController.getTaskInCompleted);
// 7. GEt /api/taks/getBYDate/:date - Get tasks by date
router.get("/getByDate/:date", sessionCheckMiddleware, TaskController.getTaskByDate);


export default router;