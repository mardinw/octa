import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "./entities/customers.entities";
import { initDatabaseConnection } from "../configs/db/mysql.utils";

@Injectable()
export class CustomerService {
  private connection;

  constructor() {
    this.initDatabaseConnection();
  }

  private async initDatabaseConnection() {
    this.connection = await initDatabaseConnection();
  }

  async query(sql: string, values?: any[]): Promise<any> {
    return await this.connection.execute(sql, values);
  }
}
