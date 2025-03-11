import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
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
  async login(@Request() req, @Body("email") email: string, @Body("password") password: string) {
    return this.authService.login(email, password);
  }

  @Post("refresh")
  async refresh(@Body("refreshToken") refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req, @Body("refreshToken") refreshToken: string) {
    return this.authService.logout(req.user.id, refreshToken);
  }
}
