import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasedEntity } from '../entities/seller/purchased.entity';
import { SellerAdapterProvider } from '../adapters/seller';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedEntity])],
  providers: SellerAdapterProvider,
  exports: SellerAdapterProvider,
})
export class SellerModuleEntity {}
