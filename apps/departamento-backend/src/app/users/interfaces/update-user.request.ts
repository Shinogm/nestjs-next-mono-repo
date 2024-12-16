import { Expose } from '@nestjs/class-transformer';
import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IUserInterface,
  SellerTypes,
} from 'src/domain/tables/entities/users/user.interface';

export class UpdateUserRequest implements Partial<IUserInterface> {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John' })
  nombre: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Does' })
  apellido: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'johnsdoe@gmail.com' })
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1234567' })
  password: string;

  @Expose()
  @IsOptional()
  @IsEnum(SellerTypes)
  @ApiProperty({ default: SellerTypes.CLIENT })
  is_seller: SellerTypes;
}
