import { SongService } from "./song.service";
export declare class SongController {
    private songService;
    constructor(songService: SongService);
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
