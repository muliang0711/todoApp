// this file only handle http requests and responses, it does not handle the business logic of the application.
// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserManager } from '../services/UserManager';

export const UserRegister = async (req: Request, res: Response) => {
    // 1. catch neccessary data from request body :
    const { name, email, password, type } = req.body;

    // 2. use UserManager to handle the register logic
    const result = await UserManager.UserRegister(name, email, password, type);

    //  3. check if the result is success or not
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }

    // 4. if success, return the userId   
    return res.status(201).json({ userId: result.data });
};

export const UserLogin = async (req: Request, res: Response) => {
    // 1. catch neccessary data from request body : 
    const { email, password, rememberMe } = req.body;

    // 2. use UserManager to handle the login logic
    const result = await UserManager.UserLogin(email, password, rememberMe);

    // 1. Login failed, return error
    if (!result.success || !result.data) { // Ensure result.data is not undefined
        return res.status(401).json({ error: result.error });
    }

    // 2. Login successful, return user data
    const { user, token } = result.data; // Destructure user and token from result.data

    req.session.email = user.getEmail();
    req.session.name = user.getName();
    req.session.type = user.getType();
    
    // 3. Login successful, return user info and token (if exists)
    return res.status(200).json({
        message: "Login successful",
        user: {
            name: user.getName(),
            email: user.getEmail(),
            type: user.getType()
        },
        ...(token && { token }) // Only include token if it exists
    });
};