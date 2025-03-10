import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req) {
    // Loại bỏ password trước khi trả về
    const { password, ...user } = req.user;
    return user;
  }
}
