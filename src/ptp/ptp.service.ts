import { Injectable } from '@nestjs/common';
import { RouterOptions } from 'express';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PtpService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async ptpCategory() {
    const connection = await this.databaseService.getConnection();

    try {
      const [queryResult] = await connection.query(
        'SELECT is_ptp FROM is_ptp',
      );

      return queryResult;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
