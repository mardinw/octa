import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  connect(@Body() signInDto: Record<string, any>, @Req() request, @Res() response) {


    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
