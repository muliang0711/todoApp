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
        type: 'normal' | 'pro'
    ): Promise<Result<number>> {
        // 1. validate the input data : 

        // 2. business logic : 
        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            return {
                success: false,
                error: "Email already registered."
            };
        }
        // 3. create a new user object
        // 4. call the repository to save the user in the database
        const user = new User(name, email, password, type);
        const result = await UserRepository.createUser(user);

        // 5. return the result
        if (!result.success) {
            return {
                success: false,
                error: "Failed to create user."
            };
        }else {
            
            return {
                success: true,
                data: result.data
            };
        }
    }
}