"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: "15m",
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: "7d",
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async register(email, password, name) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException("Email already registered");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || "",
            },
        });
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
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
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
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async refreshToken(token) {
        const refreshTokenRecord = await this.prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
            if (refreshTokenRecord) {
                await this.prisma.refreshToken.delete({
                    where: { id: refreshTokenRecord.id },
                });
            }
            throw new common_1.UnauthorizedException("Invalid or expired refresh token");
        }
        await this.prisma.refreshToken.delete({
            where: { id: refreshTokenRecord.id },
        });
        const newRefreshToken = (0, uuid_1.v4)();
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: refreshTokenRecord.user.id,
                expiresAt: refreshTokenExpiry,
            },
        });
        const payload = { email: refreshTokenRecord.user.email, sub: refreshTokenRecord.user.id };
        const newAccessToken = this.jwtService.sign(payload, {
            expiresIn: "15m",
        });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async getUserFromToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
    }
    async logout(userId, refreshToken) {
        await this.prisma.refreshToken.deleteMany({
            where: {
                userId,
                token: refreshToken,
            },
        });
        return { success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map