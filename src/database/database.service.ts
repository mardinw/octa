import { Injectable } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }
  async getConnection() {
    return await this.pool.getConnection();
  }
}
