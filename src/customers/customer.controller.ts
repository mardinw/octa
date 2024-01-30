import { Controller, Get, Query, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Get('list')
  async findAll(@Query('page') page = '1', @Res() res: Response ) {
    // Calculate the offset based on the page and limit
    const currentPage : number = parseInt(page, 10);
    const limit : number = 10
    const offset : number = (currentPage - 1) * limit;

    const accounts = await this.customerService.query(
      'SELECT card_number, first_name, dob, current_balance, last_payment_amount, type_account, leader, collector, action, description, permanent_messages FROM customer LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // get total table in customer
    const totalAccount = await this.customerService.query(
      'SELECT COUNT(*) as count FROM customer'
    );

    const pages = Math.ceil(totalAccount[0][0].count / limit);
 
    const viewData = {
      title: 'List Account - OCTA',
      subtitle: 'List Account',
      accounts: accounts,
      hasPrevious: currentPage > 1,
      previousPage: currentPage - 1,
      hasNext: currentPage < pages,
      nextPage: page + 1,
      currentPage,
      limit,
    };

    return res.render('accounts/list', { viewData });
  }
}
