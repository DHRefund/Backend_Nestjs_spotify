import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async register(email: string, password: string, name?: string) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "",
      },
    });

    // Generate tokens
    const tokens = await this.getTokens(user.id, user.email);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate tokens
    const tokens = await this.getTokens(user.id, user.email);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshToken(token: string) {
    // Tìm refresh token trong database
    const refreshTokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    // Kiểm tra xem token có tồn tại và còn hiệu lực không
    if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
      // Nếu token đã hết hạn, xóa nó khỏi database
      if (refreshTokenRecord) {
        await this.prisma.refreshToken.delete({
          where: { id: refreshTokenRecord.id },
        });
      }
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    // Xóa refresh token cũ
    await this.prisma.refreshToken.delete({
      where: { id: refreshTokenRecord.id },
    });

    // Tạo refresh token mới
    const newRefreshToken = uuidv4();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

    // Lưu refresh token mới vào database
    await this.prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: refreshTokenRecord.user.id,
        expiresAt: refreshTokenExpiry,
      },
    });

    // Tạo access token mới
    const payload = { email: refreshTokenRecord.user.email, sub: refreshTokenRecord.user.id };
    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: "15m",
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getUserFromToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  async logout(userId: string, refreshToken: string) {
    // Xóa refresh token khỏi database
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        token: refreshToken,
      },
    });
    return { success: true };
  }
}
