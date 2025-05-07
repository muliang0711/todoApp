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
    ): Promise<Result<number>> {
        // 1. Check if user already exists
        const existing = await UserRepository.findByEmail(email);

        if (existing.success && existing.data) {
            return {
                success: false,
                error: "Email already registered."
            };
        }

        // 2. Create new User
        const user = new User(name, email, password, type);

        // 3. Try saving user
        const result = await UserRepository.UserRegister(user);

        // 4. Return result
        if (!result.success) {
            return {
                success: false,
                error: "Failed to create user."
            };
        }

        return {
            success: true,
            data: result.data
        };
    }

    static async UserLogin(
        email: string,
        password: string,
        rememberMe: boolean = false
    ): Promise<Result<{user : User ; token? : string}>> {
        // 1. Check if user exists than Login 
        const result = await UserRepository.Userlogin(email, password);

        // 2. If user not found, return error
        if (!result.success || !result.data) {
            return {
                success: false,
                error: "Invalid email or password."
            };
        }

        // 3. Check if the rememberMe is true, if so create a token
        let token: string | undefined;
        if (rememberMe) {
            token = createToken(
                {
                    email : result.data.getEmail(),
                    name : result.data.getName(),
                    type : result.data.getType()
                },
                '30d' // 30 days expiration
            ); 
        }
        // 4. Return user data and token
        return {
            success: true,
            data: {
                user: result.data,
                token: token
            }
        };

    }
}