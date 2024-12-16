import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { IProducts } from 'src/domain/tables/entities/products/product.interface';

export class CreateProductsRequest implements Partial<IProducts> {
  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'casa' })
  nombre: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1234567890' })
  telefono?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'casa 255' })
  direccion: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, example: 2 })
  rooms: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, example: 2 })
  huesped: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1000 })
  price: number;
}

export class CreateProductsRequestImage {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number })
  id: number;
}
