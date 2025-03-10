import { PrismaService } from "../prisma/prisma.service";
export declare class SongService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        duration: number;
        url: string;
        imageUrl: string | null;
        userId: string;
    }[]>;
}
