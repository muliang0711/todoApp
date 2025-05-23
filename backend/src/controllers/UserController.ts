// this file only handle http requests and responses, it does not handle the business logic of the application.
// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserManager } from '../services/UserManager';
import { Session } from "express-session";

export const UserRegister = async (req: Request, res: Response) => {
    // 1. catch neccessary data from request body :
    const { name, email, password, type } = req.body;

    // 2. use UserManager to handle the register logic
    const result = await UserManager.UserRegister(name, email, password, type);

    //  3. check if the result is success or not
    if (!result.success || !result.data) { // Ensure result.data is not undefined
        return res.status(400).json({ error: result.error });
    }

    const userObj = result.data;
    // 4. if success, return the userId   
    return res.status(201).json({ 
        userId: userObj.getId() ,
        name: userObj.getName(),
        email: userObj.getEmail(),
        type: userObj.getType(),
    });
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
    
    const session = req.session as Session & {
        
        email?: string;
        name?: string;
        type?: string;
        userId?: number;
    };

    session.email = user.getEmail(); 
    session.name = user.getName(); 
    session.type = user.getType(); 
    session.userId = user.getId();


    // 3. Login successful, return user info and token (if exists)
    return res.status(200).json({
        message: "Login successful",
        user: {
            name: session.name,
            email: session.email, 
            type: session.type, 
            userId: session.userId,
        },
        ...(token && { token }) // Only include token if it exists
    });
};

