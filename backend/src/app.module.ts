import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), ClientsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
