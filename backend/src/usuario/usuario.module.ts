import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
