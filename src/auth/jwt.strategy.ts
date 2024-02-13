import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    //private readonly authService: AuthService,
    //private readonly configService: ConfigService,
    private readonly prismaService:PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { username: string }) {
    const user = await this.prismaService.users.findUnique({
      where: {
        username: payload.username
      }
    })

    return user;
    //return user;
   /* 
   console.log(payload);
   return { userId: payload.sub, username: payload.username }
   */

  }
}
