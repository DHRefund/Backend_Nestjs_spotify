import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body("email") email: string, @Body("password") password: string, @Body("name") name: string) {
    return this.authService.register(email, password, name);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body("email") email: string, @Body("password") password: string) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Request() req) {
    return this.authService.getMe(req.user.sub);
  }
}
