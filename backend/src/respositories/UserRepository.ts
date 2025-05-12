import { db } from '../config/db';
import { User } from '../models/User';
import { Result } from '../types/common';

export class UserRepository {
    // Create user method to insert a new user into the database
    static async UserRegister(user: User): Promise<Result<User>> {
        try {
            const sql = `INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)`;
            const [result] = await db.execute(sql, [
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.isPro() ? 'pro' : 'normal'
            ]);
            
            // Set the auto-generated ID to the user object
            const userId = (result as any).insertId;
            user.setId(userId);
            
            return {
                success: true,
                data: user // Return the user object with the ID set
            };
        } catch (error) {
            return {
                success: false,
                error: "Failed to insert user"
            };
        }
    }
    
    // Login method to check if a user exists in the database
    static async Userlogin(email: string, password: string): Promise<Result<User>> {
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
                userData.type,
                userData.id || userData.user_id // Handle both field names for ID
            );
            
            return {
                success: true,
                data: user // Return the user object with the ID set
            };
        } catch (error) {
            return {
                success: false,
                error: "Database error while logging in"
            };
        }   
    }
    
    // Find user by email method
    static async findUserByEmail(email: string): Promise<Result<User>> {
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
                userData.type,
                userData.id || userData.user_id // Handle both field names for ID
            );

            return {
                success: true,
                data: user // Return the user object with the ID set
            };
        } catch (error) {
            return {
                success: false,
                error: "Database error while searching user"
            };
        }
    }

    // Find user by ID method
    static async findUserById(id: number): Promise<Result<User>> {
        try {
            const sql = `SELECT * FROM users WHERE id = ? LIMIT 1`;
            const [rows] = await db.execute(sql, [id]);

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
                userData.type,
                userData.id || userData.user_id // Handle both field names for ID
            );

            return {
                success: true,
                data: user // Return the user object with the ID set
            };
        } catch (error) {
            return {
                success: false,
                error: "Database error while searching user"
            };
        }
    }
}