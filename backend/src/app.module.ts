import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';

@Module({
  imports: [],
  controllers: [UsuarioController, ClienteController],
  providers: [UsuarioService, ClienteService],
})
export class AppModule {}
