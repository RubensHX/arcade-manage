import { firebaseConfig } from './../firebase/firebase';
import { NestFactory } from '@nestjs/core';
import { initializeApp } from 'firebase/app';
import { AppModule } from './app.module';

initializeApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
