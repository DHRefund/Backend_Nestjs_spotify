import { PlaylistService } from "./playlist.service";
export declare class PlaylistController {
    private playlistService;
    constructor(playlistService: PlaylistService);
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
