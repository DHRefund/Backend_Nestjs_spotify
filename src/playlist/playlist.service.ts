import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.playlist.findMany({
      where: {
        userId,
      },
      include: {
        songs: true,
      },
    });
  }
}
