import { PrismaService } from "../prisma/prisma.service";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "@prisma/client";
export declare class SongService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Song[]>;
    create(createSongDto: CreateSongDto, userId: string): Promise<Song>;
    findOne(id: string): Promise<Song | null>;
    delete(id: string, userId: string): Promise<Song>;
    toggleLike(songId: string, userId: string): Promise<{
        liked: boolean;
    }>;
    getLikedSongs(userId: string): Promise<{
        id: string;
        title: string;
        artist: string;
        duration: number;
        songUrl: string;
        imageUrl: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        likedAt: Date;
        user: {
            name: string;
        };
    }[]>;
}
