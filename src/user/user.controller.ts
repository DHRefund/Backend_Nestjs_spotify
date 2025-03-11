import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { Request } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Request() req) {
    return this.userService.findByEmail(req.user.email);
  }

  @Put("me")
  async updateMe(@GetUser("id") userId: string, @Body() updateData: { name?: string; email?: string }) {
    return this.userService.updateUser(userId, updateData);
  }
}
