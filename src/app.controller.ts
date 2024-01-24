import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Dashboard - OCTA';
    return {
      viewData: viewData,
    };
  }

}
