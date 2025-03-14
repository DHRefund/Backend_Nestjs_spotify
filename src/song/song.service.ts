import { Injectable, UnauthorizedException } from "@nestjs/common";
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
    console.log("createSongDto thoi gian", createSongDto.duration);
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
}
