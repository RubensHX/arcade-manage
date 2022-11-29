import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClienteModule } from './cliente/cliente.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsuarioModule, ProdutosModule, ClienteModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
