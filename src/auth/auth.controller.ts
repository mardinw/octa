import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Request() req) {
    const { username, password } = req.body;
    const newUser = await this.authService.registerUser(username, password);

    return {
      message: 'User registered successfully',
      user: newUser,
    }
  }
  /*
  @Get('login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'User Login - OCTA';
    viewData['subtitle'] = 'User Login';

    return {viewData};
  }
  
  @Get('/logout')
  @Redirect('auth/login')
  logout(@Req() request) {
    request.session.user = null;
  }

  @Get('register')
  @Render('auth/register')
  register() {
    const viewData = [];
    viewData['title'] = 'User Register - OCTA';
    viewData['subtitle'] = 'User Register';

    return {viewData};
  }

  @HttpCode(HttpStatus.OK)
  @Post('connect')
  connect(@Body() signInDto: Record<string, any>) {

    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }*/
}
