import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from './auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async create(@Body() body: Auth) {
    this.AuthService.register(body);
  }

  @Post('login')
  async login(@Body() body: Auth) {
    this.AuthService.login(body);
  }

  @Post('logout')
  async logout() {
    this.AuthService.logout();
  }
}
