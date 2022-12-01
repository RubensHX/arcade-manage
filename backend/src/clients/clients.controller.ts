import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  create(@Body() body: Omit<Client, 'id'>) {
    return this.clientsService.create(body);
  }

  @Get('find-all')
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: Partial<Client>) {
    return this.clientsService.update(id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
