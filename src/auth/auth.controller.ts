import { Session ,Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Request, Response } from 'express';
import { SessionMiddleware } from './middlewares/session.middleware';

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
  async loginAccess(@Req() req: Request, @Res() res: Response, @Session() session: Record<string,any>) {
    const { username, password } = req.body;

    const result = await this.authService.createToken(username, password);

    if (result) {
      session.token = result.access_token;
      return res.redirect('/auth/profile');
    } else {
      return res.redirect('/auth/login');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return "<h1>halaman profile</h1>";
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
