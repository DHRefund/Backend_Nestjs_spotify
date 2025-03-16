import { SongService } from "./song.service";
import { CreateSongDto } from "./dto/create-song.dto";
export declare class SongController {
    private songService;
    constructor(songService: SongService);
    getLikedSongs(req: any): Promise<{
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
    getAllSongs(): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        duration: number;
        songUrl: string;
        imageUrl: string | null;
    }[]>;
    createSong(createSongDto: CreateSongDto, req: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        duration: number;
        songUrl: string;
        imageUrl: string | null;
    }>;
    getSong(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        duration: number;
        songUrl: string;
        imageUrl: string | null;
    }>;
    deleteSong(id: string, req: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        duration: number;
        songUrl: string;
        imageUrl: string | null;
    }>;
    toggleLike(id: string, req: any): Promise<{
        liked: boolean;
    }>;
}
