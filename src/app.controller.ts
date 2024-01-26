import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    const viewData = [];
    viewData['title'] = 'Dashboard - OCTA';
    return res.render('index', { viewData: viewData})
  }

}
