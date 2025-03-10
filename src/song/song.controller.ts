import { Controller, Get, UseGuards } from "@nestjs/common";
import { SongService } from "./song.service";
import { JwtGuard } from "../auth/guards/jwt.guard";

@UseGuards(JwtGuard)
@Controller("songs")
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  findAll() {
    return this.songService.findAll();
  }
}
