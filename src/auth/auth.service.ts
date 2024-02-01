import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserByID(userID: any): Promise<any> {
    const user = await this.userService.findById(userID);

    return user;
  }

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

  async login(user: users): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /*
  async signIn(
    username: string, 
    pass: string
  ) : Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }*/
}
