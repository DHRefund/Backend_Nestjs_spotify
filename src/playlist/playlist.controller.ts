import { Controller, Get, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller("playlists")
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Get()
  findAll(@GetUser("id") userId: string) {
    return this.playlistService.findAll(userId);
  }
}
