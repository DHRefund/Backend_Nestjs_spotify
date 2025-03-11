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
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("name") name: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.register(email, password, name, response);
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(email, password, response);
  }

  @Post("refresh")
  async refresh(@Body("refreshToken") refreshToken: string, @Res({ passthrough: true }) response: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }
    return this.authService.refresh(refreshToken, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
