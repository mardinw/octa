import { Controller, Get, Res, Session } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response, @Session() session: Record<string, any>) {
    if (session.user) {
      const viewData = [];
      viewData['title'] = 'Dashboard - OCTA';
      return res.render('index', { viewData: viewData})
    } else {
      return res.redirect('/auth/login');
    }
  }

}
