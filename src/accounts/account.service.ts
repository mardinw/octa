import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { initDatabaseConnection } from "../configs/db/mysql.utils";
//import { PrismaService } from "src/prisma/prisma.service";
//import { customer } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class AccountService {

  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async customersWithLimitOffset(limit: number, offset: number) {

    const connection = await this.databaseService.getConnection();
    const sanitizedLimit = Math.max(0, limit);
    const sanitizedOffset = Math.max(0, offset);
  
    try {
      const [allCustomers] = await connection.query(
        'SELECT * FROM customer LIMIT ? OFFSET ?',
        [sanitizedLimit, sanitizedOffset]
      );

      return allCustomers;
    } catch (error) {
        throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }

  async customerCount(limit: number) {
    const connection = await this.databaseService.getConnection();
    try {
      const [ result ] = await connection.query(
        'SELECT COUNT(*) as count from customer',
      );

      const resultF = result[0].count;
      const count = Math.ceil(resultF/limit); 
      return count;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
