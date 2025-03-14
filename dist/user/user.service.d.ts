import { PrismaService } from "../prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(userId: string): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
    updateUser(userId: string, data: {
        name?: string;
        email?: string;
    }): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
}
