import { Get, Controller } from '@nestjs/common';

@Controller('welcome')
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }
}
