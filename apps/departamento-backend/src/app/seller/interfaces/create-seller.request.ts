import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IPurchased } from 'src/domain/tables/entities/seller/purchased.interface';

export class CreateSellerRequest implements Partial<IPurchased> {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  departamento_id: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, example: 2 })
  user_id: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1000 })
  amount: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  quantity: number;
}
