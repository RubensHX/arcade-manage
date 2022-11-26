import { Controller, Get, Patch, Post, Delete, Param } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Post('/create')
  async create(
    @Body() nome: string,
    email: string,
    telefone: string,
    endereco: string,
  ) {
    const cliente = new Cliente({ nome, email, telefone, endereco });
    this.clienteService.create(cliente);
  }

  @Get('/read')
  async read() {
    this.clienteService.read();
  }

  @Patch('/update/:id')
  async update(
    @Body() nome: string,
    email: string,
    telefone: string,
    endereco: string,
    @Param('id') id: string,
  ) {
    const cliente = new Cliente({ nome, email, telefone, endereco });
    this.clienteService.update(cliente, id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    this.clienteService.delete(id);
  }
}
