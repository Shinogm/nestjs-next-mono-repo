import { Module } from '@nestjs/common';
import { UserModuleEntity } from './modules/user.module';
import { SellerModuleEntity } from './modules/seller.module';
import { ProductsModuleEntity } from './modules/products.module';

const modules = [UserModuleEntity, SellerModuleEntity, ProductsModuleEntity];

@Module({
  imports: modules,
  exports: modules,
})
export class TablesModule {}
