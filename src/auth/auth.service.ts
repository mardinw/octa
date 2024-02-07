import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return true;
    }

    return false;
  }

  /*
  async validateUserByID(userID: number): Promise<users | null> {
    const user = await this.userService.findById(userID);

    return user;
  }
  */
 
  async registerUser(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async createToken(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);

    if (user && bcrypt.compare(password, user.password)) {
      const payload = { sub: user.id, username: user.username };
      const accessToken = this.jwtService.sign(payload);

      return { access_token: accessToken };
    }

    return null;
  }
}
