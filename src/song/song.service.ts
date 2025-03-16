import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "@prisma/client";

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Song[]> {
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

  async create(createSongDto: CreateSongDto, userId: string): Promise<Song> {
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

  async findOne(id: string): Promise<Song | null> {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  async delete(id: string, userId: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song || song.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prisma.song.delete({
      where: { id },
    });

    return song;
  }

  async toggleLike(songId: string, userId: string) {
    const existingLike = await this.prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId: userId,
          songId: songId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await this.prisma.likedSong.delete({
        where: {
          userId_songId: {
            userId: userId,
            songId: songId,
          },
        },
      });
      return { liked: false };
    } else {
      // Like
      await this.prisma.likedSong.create({
        data: {
          userId: userId,
          songId: songId,
        },
      });
      return { liked: true };
    }
  }

  async getLikedSongs(userId: string) {
    try {
      // Fetch liked songs với full song data
      const likedSongs = await this.prisma.likedSong.findMany({
        where: {
          userId: userId,
        },
        include: {
          // Đổi từ select sang include
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

      // Transform data để trả về đúng format
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
    } catch (error) {
      console.error("Error in getLikedSongs:", error);
      throw error;
    }
  }
}
