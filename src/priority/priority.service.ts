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
      const [allPriority]  = await connection.query(
        'SELECT priority FROM priority',
      );

      return allPriority;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
