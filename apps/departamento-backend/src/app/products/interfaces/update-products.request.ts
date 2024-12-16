import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { IProducts } from 'src/domain/tables/entities/products/product.interface';

export class UpdateProductsRequest implements Partial<IProducts> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'casa' })
  nombre: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1234567890' })
  telefono?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'casa 255' })
  direccion: string;
}
