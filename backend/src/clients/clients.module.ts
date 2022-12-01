import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ClientsController],
  providers: [ClientsService, FirebaseService],
})
export class ClientsModule {}
