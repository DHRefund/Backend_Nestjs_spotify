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
            songUrl: string;
            imageUrl: string | null;
            duration: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
}
