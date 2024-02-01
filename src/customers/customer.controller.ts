import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Get('list')
  @Render('accounts/list')
  async findAll(@Query('page') page = '1', @Res() res: Response ) {
    // Calculate the offset based on the page and limit
    const currentPage : number = parseInt(page, 10);
    const limit : number = 10
    const offset : number = (currentPage - 1) * limit;

    const customers = await this.customerService.customersWithLimitOffset(limit, offset);

    const viewData = {
      accounts: customers,
      currentPage,
      limit,
    }

    return { viewData };
  }
}
