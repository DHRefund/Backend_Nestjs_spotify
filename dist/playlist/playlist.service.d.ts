import { PrismaService } from "../prisma/prisma.service";
export declare class PlaylistService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<({
        songs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            artist: string;
            duration: number;
            url: string;
            imageUrl: string | null;
            userId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
}
