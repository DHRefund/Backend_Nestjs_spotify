import { SongService } from "./song.service";
export declare class SongController {
    private songService;
    constructor(songService: SongService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        artist: string;
        duration: number;
        url: string;
        imageUrl: string | null;
    }[]>;
}
