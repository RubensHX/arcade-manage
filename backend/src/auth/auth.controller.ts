import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { Auth } from './auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() body: Auth) {
    this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: Auth) {
    this.authService.login(body);
  }

  @Get('logout')
  async logout(@Response() res) {
    this.authService.logout();
    res.send('Logged out');
  }

  @Post('googleLogin')
  async googleLogin() {
    this.authService.googleLogin();
  }

  @Get('isAuthenticated')
  isAuthenticated(@Response() res) {
    const user = this.authService.isAuthenticated();
    if (user) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  }
}
