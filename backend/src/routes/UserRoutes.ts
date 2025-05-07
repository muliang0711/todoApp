// routes/userRoutes.ts
import { Router } from "express";
import { registerUser } from "../controllers/UserController";

const router = Router();

// POST /api/users/register
router.post("/register", registerUser);

export default router;