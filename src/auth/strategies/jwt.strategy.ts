import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log("Cookies in request:", request.cookies);
          const token = request?.cookies?.token;
          console.log("Extracted token:", token);
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log("Payload in validate:", payload);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    console.log("Found user:", user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
