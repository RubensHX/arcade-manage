import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateProdutoDto {
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;
}
