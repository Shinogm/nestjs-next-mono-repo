import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DepartamentEntity,
  DepartmentImage,
} from '../entities/products/product.entity';
import { ProductsAdapterProvider } from '../adapters/products';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentEntity, DepartmentImage])],
  providers: ProductsAdapterProvider,
  exports: ProductsAdapterProvider,
})
export class ProductsModuleEntity {}
