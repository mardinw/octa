import { Session ,Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Render, Req, Res, UseGuards, Next } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Response }  from 'express';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginAccess(@Req() req, @Res() res){

    const username = req.body.username;
    const password = req.body.password;
    const isValid = await this.authService.validateUser(username, password);
    
    if (isValid) {
      const result = await this.authService.createToken(username, password);
      res.cookie(
        'access_token', result.access_token,
        {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 1000), // 6 detik
        }
      );
      res.status(200).json({ success: true, access_token: result.access_token })
    } else {
      return;
    }
  }

  @Get('check')
  async checkSession(@Res() res, @Req() req ) {
    const username = req.user;
    if (username) {
      return res.redirect('profile')
      /*
      return {
        message: 'session is available',
        username
      };*/
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res() res, @Session() session: Record<string, any>) {
    session.token = null;
    return res.redirect('login');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res) {
    console.error(req.user);
    return "sukses";
  }

  @Post('register')
  async register(@Req() req) {
    const { username, password } = req.body;
    const newUser = await this.authService.registerUser(username, password);

    return {
      message: 'User registered successfully',
      user: newUser,
    }
  }
}
