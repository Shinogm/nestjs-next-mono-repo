import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { DomainModule } from 'src/domain/domain.module';
import { ProductsService } from './services/products.service';

@Module({
  imports: [DomainModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
