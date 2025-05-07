// routes/userRoutes.ts
import { Router } from "express";
import { UserRegister , UserLogin} from "../controllers/UserController";

const router = Router();

// POST /api/users/register
router.post("/register", UserRegister);
router.post("/login", UserLogin);
export default router;