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
