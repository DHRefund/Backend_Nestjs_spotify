import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from "@nestjs/common";
import { SongService } from "./song.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateSongDto } from "./dto/create-song.dto";

@Controller("songs")
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  async getAllSongs() {
    return this.songService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSong(@Body() createSongDto: CreateSongDto, @Request() req) {
    console.log("Request in createSong:", {
      headers: req.headers,
      cookies: req.cookies,
      user: req.user,
    });

    return this.songService.create(createSongDto, req.user.id);
  }

  @Get(":id")
  async getSong(@Param("id") id: string) {
    return this.songService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteSong(@Param("id") id: string, @Request() req) {
    return this.songService.delete(id, req.user.id);
  }
}
