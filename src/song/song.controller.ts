import { Controller, Get, UseGuards } from "@nestjs/common";
import { SongService } from "./song.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("songs")
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  findAll() {
    return this.songService.findAll();
  }
}
