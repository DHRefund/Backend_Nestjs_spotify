import { PrismaService } from "../prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        email: string;
        id: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
