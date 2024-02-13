import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get('/')
  checkRole(req, res, next) {
    if (req.session.user && req.session.user.role == 'admin') {
      next();
    } else {
      res.redirect('auth/login');
    }
  };
}
