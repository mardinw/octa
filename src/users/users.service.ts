import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  async findById(userID: any): Promise<users | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: userID,
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByUsername(username: string): Promise<users> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username: username,
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
