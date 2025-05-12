// this fiele is reponsible to business logic of user
// and decide what to do by the controller calling 

// 1. import neccesary modules and classes
import { User } from "../models/User";
import { UserRepository } from "../respositories/UserRepository";
import { Result } from "../types/common";
import { createToken } from '../utils/jwt';
// 2. define UserManager class to handle user-related business logic

export class UserManager {

    static async UserRegister(
        name: string,
        email: string,
        password: string,
        type: "normal" | "pro"
    ): Promise<Result<User>> {
        const existing = await UserRepository.findUserByEmail(email);
        if (existing.success && existing.data) {
            return { success: false, error: "Email already registered." };
        }
    
        const user = new User(name, email, password, type);
        const result = await UserRepository.UserRegister(user);
    
        if (!result.success || !result.data?.getId()) {
            return { success: false, error: "Failed to create user." };
        }
        
        const userObj = result.data;
        return {
            success: true,
            data: userObj // Return the user object with the ID set
        };
    }
    
    static async UserLogin(
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<Result<{ user: User; token?: string }>> {
        const result = await UserRepository.Userlogin(email, password);
    
        if (!result.success || !result.data) {
            return {
                success: false,
                error: "Invalid email or password."
            };
        }
    
        let token: string | undefined;
        if (rememberMe) {
            token = createToken(
                {
                    email: result.data.getEmail(),
                    name: result.data.getName(),
                },
                '30d'
            );
        }
        
        const userObj = result.data;

        return {
            success: true,
            data: { user: userObj, token }
        };
    }
    
    static async findUserByEmail(email: string): Promise<Result<User>> {
        const result = await UserRepository.findUserByEmail(email);
        if (!result.success || !result.data) {
            return { success: false, error: "User not found." };
        }

        const userObj = result.data;
        return {
            success: true,
            data: userObj // Return the user object with the ID set
        };

    }

    static async findUserById(id: number): Promise<Result<User>> {
        const result = await UserRepository.findUserById(id);
        if (!result.success || !result.data) {
            return { success: false, error: "User not found." };
        }
        const userObj = result.data;
        return { success: true, data: userObj };
    }
    

}