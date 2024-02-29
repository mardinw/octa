import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { initDatabaseConnection } from "../configs/db/mysql.utils";
import { DatabaseService } from "src/database/database.service";
import { RowDataPacket } from "mysql2";

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
  
  async customersAll() {

    const connection = await this.databaseService.getConnection();
  
    try {
      const queryResult = await connection.query<RowDataPacket[]>(
        'SELECT * FROM customer',
      );

      const allCustomers: RowDataPacket[] = Array.isArray(queryResult) ? queryResult[0]: [];

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
  
  async customerCountPriority(limit: number, priorityName: string) {
    const connection = await this.databaseService.getConnection();
    try {
      const [ result ] = await connection.query(
        'SELECT COUNT(*) AS count FROM customer WHERE priority = ?',
        [priorityName]
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


  async customerCardNumber(cardNumber: number) {
    const connection = await this.databaseService.getConnection();

    try {
      const [ result ] = await connection.query(
        'SELECT * FROM customer WHERE card_number = ?',
        [cardNumber]
      )

      return result;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  }

  async customerFilterPriority(priorityName: string, limit: number, offset: number) {
    const connection = await this.databaseService.getConnection();
    const sanitizedLimit = Math.max(0, limit);
    const sanitizedOffset = Math.max(0, offset);

    try {
      const [allCustomerPriority] = await connection.query(
        'SELECT * FROM customer WHERE priority = ? LIMIT ? OFFSET ?',
        [ priorityName, sanitizedLimit, sanitizedOffset ]
      ); 
      return allCustomerPriority;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    } finally {
      connection.release();
    }
  } 
}
