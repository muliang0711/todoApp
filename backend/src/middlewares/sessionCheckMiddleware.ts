import { Request , Response , NextFunction } from "express";

export const sessionCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
     
    // 1. Check if the session exists
    if(!req.session){
        return res.status(401).json({ error: "Session not found." });
    }

    next(); // Proceed to the next middleware or route handler
}