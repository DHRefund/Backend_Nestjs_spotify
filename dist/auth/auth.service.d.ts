import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private getTokens;
    private setTokenCookie;
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
    getMe(userId: string): Promise<{
        email: string;
        id: string;
        name: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    refresh(refreshToken: string, response: Response): Promise<{
        access_token: string;
    }>;
    logout(response: Response): Promise<{
        success: boolean;
    }>;
    getUserFromToken(token: string): Promise<User>;
}
