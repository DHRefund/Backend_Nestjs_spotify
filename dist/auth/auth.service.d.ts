import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private getTokens;
    register(email: string, password: string, name?: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
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
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUserFromToken(token: string): Promise<User>;
    logout(userId: string, refreshToken: string): Promise<{
        success: boolean;
    }>;
}
