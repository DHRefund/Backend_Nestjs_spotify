"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SongService = class SongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.song.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    async create(createSongDto, userId) {
        const song = await this.prisma.song.create({
            data: {
                title: createSongDto.title,
                artist: createSongDto.artist,
                duration: createSongDto.duration,
                songUrl: createSongDto.songUrl,
                imageUrl: createSongDto.imageUrl,
                userId: userId,
            },
        });
        return song;
    }
    async findOne(id) {
        return this.prisma.song.findUnique({
            where: { id },
        });
    }
    async delete(id, userId) {
        const song = await this.prisma.song.findUnique({
            where: { id },
        });
        if (!song || song.userId !== userId) {
            throw new common_1.UnauthorizedException();
        }
        await this.prisma.song.delete({
            where: { id },
        });
        return song;
    }
    async toggleLike(songId, userId) {
        const existingLike = await this.prisma.likedSong.findUnique({
            where: {
                userId_songId: {
                    userId: userId,
                    songId: songId,
                },
            },
        });
        if (existingLike) {
            await this.prisma.likedSong.delete({
                where: {
                    userId_songId: {
                        userId: userId,
                        songId: songId,
                    },
                },
            });
            return { liked: false };
        }
        else {
            await this.prisma.likedSong.create({
                data: {
                    userId: userId,
                    songId: songId,
                },
            });
            return { liked: true };
        }
    }
    async getLikedSongs(userId) {
        try {
            const likedSongs = await this.prisma.likedSong.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    song: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            console.log("Raw liked songs from DB:", likedSongs);
            const transformedSongs = likedSongs.map((like) => ({
                id: like.song.id,
                title: like.song.title,
                artist: like.song.artist,
                duration: like.song.duration,
                songUrl: like.song.songUrl,
                imageUrl: like.song.imageUrl,
                userId: like.song.userId,
                createdAt: like.song.createdAt,
                updatedAt: like.song.updatedAt,
                likedAt: like.createdAt,
                user: like.song.user,
            }));
            console.log("Transformed liked songs:", transformedSongs);
            return transformedSongs;
        }
        catch (error) {
            console.error("Error in getLikedSongs:", error);
            throw error;
        }
    }
};
exports.SongService = SongService;
exports.SongService = SongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SongService);
//# sourceMappingURL=song.service.js.map