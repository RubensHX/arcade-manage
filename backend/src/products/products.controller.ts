import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() body: Product) {
    body.id = randomUUID();
    return this.productsService.create(body);
  }

  @Get('find-all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.productsService.update(id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
