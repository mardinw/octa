import { Controller, Get, Query, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Get('list')
  async getListCustomers(@Query('page') page = 1, @Res() res: Response ) {
    // Calculate the offset based on the page and limit
    const limit = 10
    const offset = (page - 1) * limit;
    
    const accounts = await this.customerService.query(
      'SELECT card_number, first_name, dob, current_balance, last_payment_amount, type_account, leader, collector, action, description, permanent_messages FROM customer LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // get total table in customer
    const totalAccount = await this.customerService.query(
      'SELECT COUNT(*) as count FROM customer'
    );

    const viewData = {
      title: 'List Account - OCTA',
      subtitle: 'List Account',
      accounts,
      page,
      limit,
    };

    console.log(viewData);
   return res.render('accounts/list', { viewData})
  }
}
