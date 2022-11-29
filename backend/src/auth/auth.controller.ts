import { Body, Controller, Post } from '@nestjs/common';
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

  @Post('logout')
  async logout() {
    this.authService.logout();
  }
}
