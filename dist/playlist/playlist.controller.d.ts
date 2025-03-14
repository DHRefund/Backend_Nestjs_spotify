import { PlaylistService } from "./playlist.service";
export declare class PlaylistController {
    private playlistService;
    constructor(playlistService: PlaylistService);
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
