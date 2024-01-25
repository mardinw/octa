import { Controller, Get, Query, Render } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('master')
  @Render('accounts/master')
  async getAllCustomers(@Query('page') page = 1) {
    // Calculate the offset based on the page and limit
    const limit = 10
    const offset = (page - 1) * limit;
    
    const accounts = await this.customerService.query(
      'SELECT id, first_name FROM customer LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // get total table in customer
    const totalAccount = await this.customerService.query(
      'SELECT COUNT(*) as count FROM customer'
    );

    const viewData = {
      title: 'Master Account - OCTA',
      subtitle: 'Master Account',
      accounts,
      page,
      limit,
      totalAccount: totalAccount[0].count,
    };
   
    console.log(viewData.page * viewData.limit);
    return {
      viewData
    };
  }
}
