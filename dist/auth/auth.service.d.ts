import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private setTokenCookie;
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
    getMe(userId: string): Promise<{
        email: string;
        name: string;
        id: string;
    }>;
    logout(response: Response): Promise<{
        success: boolean;
    }>;
    getUserFromToken(token: string): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
