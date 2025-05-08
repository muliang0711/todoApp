// tokenCheckMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Session } from "express-session";

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const tokenCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1. Skip if no token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, SECRET);

    // 2. If token valid, restore session and return response directly
    const session = req.session as Session & {
      email?: string;
      name?: string;
      type?: string;
    };

    session.email = decoded.email;
    session.name  = decoded.name;
    session.type  = decoded.type;

    return res.status(200).json({
      message: "Auto-login successful via token",
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      }

    });
  } catch (err) {
    // 3. If token invalid → proceed to normal login
    return next();
  }
};
