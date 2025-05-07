
// 1. import db from the config/db.ts file to execute queries

// 2. import User from the UserModel.ts file to use the User class

import { db } from '../config/db';
import { User } from '../models/User';
import { Result } from '../types/common';

// 3. define UserRepository class to handle user-related database operations

// 4. createUser method to insert a new user into the database
export class UserRepository {
    // 1. createUser method to insert a new user into the database
    static async UserRegister(user: User): Promise<Result<number>> {
        try {
            const sql = `INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)`;
            const [result] = await db.execute(sql, [
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.isPro() ? 'pro' : 'normal'
            ]);
            return {
                success: true,
                data: (result as any).insertId
            };
        } catch (error) {
            return {
                success: false,
                error: "Failed to insert user"
            };
        }
    }
    // 3. login method to check if a user exists in the database
    static async Userlogin (email : string , password : string ):
    Promise<Result<User>>{
        try {
            const sql = `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`;
            const [rows] = await db.execute(sql, [email, password]);

            const userData = (rows as any[])[0];

            if (!userData) {
                return {
                    success: false,
                    error: "Invalid email or password"
                };
            }
            const user = new User(
                userData.name,
                userData.email,
                userData.password,
                userData.type
            );
            return {
                success: true,
                data: user // or any other user data you want to return
            };
        }catch (error) {
            return {
                success: false,
                error: "Database error while logging in"
            };
        }   
    } 
    // 2. findByEmail method to find a user by email
    static async findByEmail(email: string): 
    Promise<Result<User>> {
        try {
            const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
            const [rows] = await db.execute(sql, [email]);

            const userData = (rows as any[])[0];

            if (!userData) {
                return {
                    success: false,
                    error: "User not found"
                };
            }

            const user = new User(
                userData.name,
                userData.email,
                userData.password,
                userData.type
            );

            return {
                success: true,
                data: user
            };
        } catch (error) {
            return {
                success: false,
                error: "Database error while searching user"
            };
        }
    }

}