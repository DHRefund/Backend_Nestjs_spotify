import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, response: Response): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    logout(response: Response): Promise<{
        success: boolean;
    }>;
    getMe(req: any): Promise<{
        email: string;
        name: string;
        id: string;
    }>;
}
