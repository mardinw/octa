import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { initDatabaseConnection } from "../configs/db/mysql.utils";
import { PrismaService } from "src/prisma.service";
import { customer } from "@prisma/client";

@Injectable()
export class CustomerService {

  constructor(private prisma: PrismaService) {}

  async customersWithLimitOffset(limit: number, offset: number): Promise<customer[]> {

    const sanitizedLimit = Math.max(0, limit);
    const sanitizedOffset = Math.max(0, offset);
  
    try {
      const customers = await this.prisma.customer.findMany({
        take: sanitizedLimit,
        skip: sanitizedOffset,
      })

      const processedCustomers = customers.map((customer) => {
        if (customer.ptp_date === null) {
        }

        return customer;
      });

      const filteredCustomers = processedCustomers.filter((customer) => customer !== null);

      return filteredCustomers;
    } catch (error) {
        throw new Error(`Error fetching customers: ${error.message}`);
    }
  }
}
