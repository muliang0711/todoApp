// src/types/express.d.ts
import "express-session";

declare module "express-session" {
    interface SessionData {
        email?: string;
        name?: string;
        type? : "normal" | "pro";
    }
}
