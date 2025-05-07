// this file only handle http requests and responses, it does not handle the business logic of the application.
// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserManager } from '../services/UserManager';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, type } = req.body;

  const result = await UserManager.createUser(name, email, password, type);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({ userId: result.data });
};
