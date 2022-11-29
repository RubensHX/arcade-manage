import { Body, Controller, Post } from '@nestjs/common';
import { auth } from 'firebase/firebase';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/create')
  async create(@Body() email: string, @Body() password: string) {
    this.usuarioService.createUser(auth, email, password);
  }

  @Post('/login')
  async login(@Body() email: string, password: string) {
    this.usuarioService.login(auth, email, password);
  }

  @Post('/logout')
  async logout() {
    this.usuarioService.logout(auth);
  }

  @Post('/delete')
  async delete() {
    this.usuarioService.delete(auth);
  }

  @Post('/loginWithGoogle')
  async loginWithGoogle() {
    this.usuarioService.loginWithGoogle(auth);
  }

  @Post('/loginWithFacebook')
  async loginWithFacebook() {
    this.usuarioService.loginWithFacebook(auth);
  }
}
