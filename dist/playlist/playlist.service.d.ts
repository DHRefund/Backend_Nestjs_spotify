import { PrismaService } from "../prisma/prisma.service";
export declare class PlaylistService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<({
        songs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            artist: string;
            duration: number;
            url: string;
            imageUrl: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
}
