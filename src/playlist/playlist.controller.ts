import { Controller, Get, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";

@UseGuards(JwtGuard)
@Controller("playlists")
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Get()
  findAll(@GetUser("id") userId: string) {
    return this.playlistService.findAll(userId);
  }
}
