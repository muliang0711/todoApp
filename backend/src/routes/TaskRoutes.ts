import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { sessionCheckMiddleware } from "../middlewares/sessionCheckMiddleware";

// 1. Create a router instance
const router = Router();
// 2. Define routes for task-related operations
// 3. POST /api/tasks/create - Create a new task
router.post("/create", sessionCheckMiddleware, TaskController.createTask);

export default router;