import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}
  
  async validateUser(username: string, password: string) {
    const connection = await this.databaseService.getConnection();

    try {
      const [result] = await connection.query(
        'SELECT * from `users` WHERE `username` = ?',
        [username]
      );

      const user = result[0];
      if( user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return user;
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) {
        connection.release();
      }
    }

    return null;
  }

  async registerUser(username: string, password: string): Promise<any> {
    const connection = await this.databaseService.getConnection();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await connection.execute(
        'INSERT INTO `users` (username, password) VALUES (?, ?)',
        [username, password],
      );

      return newUser;
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) {
        connection.release();
      }
    }

  }

  async createLoginTime(username: string, loginTime: number) {
    const connection = await this.databaseService.getConnection();

    try {
      const [result] = await connection.execute(
        'UPDATE `users` SET `login_time` = ? WHERE `username` = ?',
        [loginTime, username],
      );
      return true;
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) {
        connection.release();
      }
    }

    return null;
  }
}
