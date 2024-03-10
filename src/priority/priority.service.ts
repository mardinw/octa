import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PriorityService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async priorityAll() {
    const connection = await this.databaseService.getConnection();

    try {
      const [queryResult]  = await connection.query(
        'SELECT priority FROM priority',
      );

      return queryResult;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
