import { Controller, Get, Render } from '@nestjs/common';
import { CustomerService } from './models/customer.service';

@Controller('/accounts')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('master')
  @Render('accounts/master')
  async master() {
    const viewData = [];
    viewData['title'] = 'Master Account - OCTA';
    viewData['subtitle'] = 'Master Account';
    viewData['accounts'] = await this.customerService.findAll();
    return {
      viewData: viewData,
    };
  }
}
