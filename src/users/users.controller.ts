import { Session, Controller, Get, Next, Render, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  @Get('/')
  @Render('users/index')
  checkRole(@Session() session: Record<string, any>, @Req() req: Request, @Res() res: Response, @Next() next) {
    if (session.user) {
    } else {
      return res.redirect('/auth/login');
    }
  };
}
