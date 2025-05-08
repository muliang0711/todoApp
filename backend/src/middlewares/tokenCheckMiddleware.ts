// tokenCheckMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Session } from "express-session";

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const tokenCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(); // No token → continue to normal login
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, SECRET);

    // Restore session if valid token

    const session = req.session as Session & {
      email?: string;
      name?: string;
      type?: string;
    };
      
    session.email = decoded.email;
    session.name = decoded.name;
    session.type = decoded.type; 

    // Skip login logic, return success immediately
    return res.status(200).json({
      message: "Auto-login successful via token",
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      }
    });
  } catch (err) {
    return next(); // Invalid token → fallback to login logic
  }
};
