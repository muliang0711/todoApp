// routes/userRoutes.ts
import { Router } from "express";
import { UserRegister , UserLogin} from "../controllers/UserController";
import { tokenCheckMiddleware } from "../middlewares/tokenCheckMiddleware";
const router = Router();

// POST /api/users/register
router.post("/register", UserRegister);
router.post("/login", tokenCheckMiddleware , UserLogin);

export default router;