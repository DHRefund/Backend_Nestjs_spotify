import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from "@nestjs/common";
import { SongService } from "./song.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateSongDto } from "./dto/create-song.dto";
import { log } from "console";

@Controller("songs")
export class SongController {
  constructor(private songService: SongService) {}

  @Get("liked")
  @UseGuards(JwtAuthGuard)
  async getLikedSongs(@Request() req) {
    return this.songService.getLikedSongs(req.user.id);
  }

  @Get()
  async getAllSongs() {
    return this.songService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSong(@Body() createSongDto: CreateSongDto, @Request() req) {
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

  @Post(":id/like")
  @UseGuards(JwtAuthGuard)
  async toggleLike(@Param("id") id: string, @Request() req) {
    return this.songService.toggleLike(id, req.user.id);
  }
}
