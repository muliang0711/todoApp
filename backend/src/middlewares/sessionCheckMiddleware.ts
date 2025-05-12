import { Request , Response , NextFunction } from "express";
import { Session } from "express-session";

export const sessionCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const session = req.session as Session &{
        email?: string;
        name?: string;
        type?: string;
        userId?: number;
    }
    // 1. Check if the session exists
    if(!req.session || !session.userId || !session.email || !session.name || !session.type) {
        return res.status(401).json({ error: "Session not found." });
    }

    next(); // Proceed to the next middleware or route handler
}