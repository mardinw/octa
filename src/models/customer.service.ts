import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ){}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOneById(id);
  }
}
