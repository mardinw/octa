import { Session ,Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Render, Req, Res, UseGuards, Next } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Response, Request }  from 'express';
import { UserValidator } from 'src/validators/user.validator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  @Render('auth/login')
  login(@Res() res: Response){
    const viewData = [];
    viewData['title'] = 'User Login - OCTA';
    viewData['subtitle'] = 'User Login';

    return {viewData};
  }
  
  @Get('register')
  @Render('auth/register')
  createAccount(@Res() res: Response){
    const viewData = [];
    viewData['title'] = 'Create User - OCTA';
    viewData['subtitle'] = 'Create User';

    return {viewData};
  }

  @Post('connect')
  async loginAccess(@Body() body , @Res() res: Response, @Session() session: Record<string, any>){

    const username = body.username;
    const password = body.password;
    const user = await this.authService.validateUser(username, password);
    
    if (user) {
      session.user =  {
        id: user.id,
        name: user.username,
      }
      res.redirect('/accounts/list')
      /*
      const result = await this.authService.createToken(username, password);
      res.cookie(
        'access_token', result.access_token,
        {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 1000), // 6 detik
        }
      );*/
    } else {
      res.redirect('login');
    }
  }

  @Get('logout')
  @Redirect('login')
  logout(@Res() res, @Req() req) {
    return req.session.user = null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res) {
    console.error(req.user);
    return "sukses";
  }

  @Post('create')
  async register(@Body() body,@Req() req, @Res() res) {

    const toValidate: string[] = ['username', 'password']
    const errors: string[] = UserValidator.validate(body, toValidate)
    if (errors.length > 0) {
      req.session.flashErrors = errors;
      return res.redirect('register')
    } else {
      const username = body.username;
      const password = body.password;

      await this.authService.registerUser(username, password);

      return res.redirect('login');
    }
  }
}
