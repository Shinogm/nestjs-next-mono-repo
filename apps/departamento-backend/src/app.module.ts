import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';
import { UserModule } from './app/users/user.module';
import { SellerModule } from './app/seller/seller.module';
import { ProductsModule } from './app/products/products.module';

@Module({
  imports: [ProvidersModule, UserModule, SellerModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
