import { Controller, Get, Query, Render, Res, Session } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';

@Controller('/accounts')
export class AccountController {
  constructor(private readonly customerService: AccountService) {}
  
  @Get('list')
  @Render('accounts/list')
  async findAll(@Query('page') page = '1', @Res() res: Response, @Session() session:Record<string, any> ) {

    if (session.user) {
      const currentPage : number = parseInt(page, 10);
      const limit : number = 20
      const offset : number = (currentPage - 1) * limit;

      const customers = await this.customerService.customersWithLimitOffset(limit, offset);

      const pages = await this.customerService.customerCount(limit);

      const viewData = {
        accounts: customers,
        pages,
        currentPage,
        limit,
      }

      return { viewData };
    } else {
      return res.redirect('/auth/login');
    }
  }

  @Get('show')
  @Render('accounts/show')
  async byPriority(@Query('page') page = '1', @Query('filter') filter: string, @Res() res: Response, @Session() session: Record<string, any>) {
    if (session.user) {
      const currentPage : number = parseInt(page, 10);
      const limit : number = 20
      const offset : number = (currentPage - 1) * limit;
      
      const customers = await this.customerService.customerFilterPriority(filter, limit, offset);

      const pages = await this.customerService.customerCountPriority(limit, filter);
      
      const viewData = {
        accounts: customers,
        pages,
        filter,
        currentPage,
        limit,
      }

      return { viewData };
    } else {
      return res.redirect('/auth/login');
    }
  }

  @Get('card')
  async byCardNumber(@Query('id') id : string, @Res() res: Response, @Session() session: Record<string, any>) { 
    if (session.user) {
      const cardNumber = parseInt(id, 10);
      const customer = await this.customerService.customerCardNumber(cardNumber);
      console.log(customer);
      return;
    } else {
      return res.redirect('/auth/login');
    }
  }
}
