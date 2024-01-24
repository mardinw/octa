import { Controller, Get, Render } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('master')
  @Render('accounts/master')
  async getAllCustomers() {
    const viewData = {
      title: 'Master Account - OCTA',
      subtitle: 'Master Account',
      accounts: await this.customerService.query('SELECT id, first_name FROM customer')
    };
    
    return {
      viewData
    };
  }
}
