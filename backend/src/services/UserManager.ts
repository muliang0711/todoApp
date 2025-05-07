// this fiele is reponsible to business logic of user
// and decide what to do by the controller calling 

// 1. import neccesary modules and classes
import { User } from "../models/User";
import { UserRepository } from "../respositories/UserRepository";
import { Result } from "../types/common";

// 2. define UserManager class to handle user-related business logic

export class UserManager {

    static async createUser(
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

    static async loginUser(
        email: string,
        password: string
    ): Promise<Result<User>> {
        // 1. Check if user exists
        const existing = await UserRepository.Userlogin(email, password);

        if (!existing.success) {
            return {
                success: false,
                error: "Invalid email or password."
            };
        }

        // 2. Return user data
        return {
            success: true,
            data: existing.data
        };
    }
}