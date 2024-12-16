import { Expose } from '@nestjs/class-transformer';
import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IUserInterface,
  SellerTypes,
} from 'src/domain/tables/entities/users/user.interface';

export class CreateUserRequest implements Partial<IUserInterface> {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  nombre: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  apellido: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;

  @Expose()
  @IsEnum(SellerTypes)
  @ApiProperty({ default: SellerTypes.CLIENT })
  is_seller: SellerTypes;
}
