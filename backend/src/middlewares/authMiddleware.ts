
// 1. import necessary modules and types
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    

}