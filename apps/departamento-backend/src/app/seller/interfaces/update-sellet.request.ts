import { Expose } from '@nestjs/class-transformer';
import { IsOptional } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { IPurchased } from 'src/domain/tables/entities/seller/purchased.interface';

export class UpdateSellerRequest implements Partial<IPurchased> {
  @Expose()
  @IsOptional()
  @IsNumber()
  departamento_id: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  user_id: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  amount: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  quantity: number;
}
