// tokenCheckMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    
    req.session.email = decoded.email;
    req.session.name = decoded.name;
    req.session.type = decoded.type; // Assuming type is part of the token payload

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
