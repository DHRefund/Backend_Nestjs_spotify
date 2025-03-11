import { Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(email: string, password: string, name: string, response: Response): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    login(email: string, password: string, response: Response): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    refresh(refreshToken: string, response: Response): Promise<{
        access_token: string;
    }>;
    logout(response: Response): Promise<{
        success: boolean;
    }>;
}
