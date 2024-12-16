import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { DomainModule } from 'src/domain/domain.module';
import { SellerService } from './services/seller.service';

@Module({
  imports: [DomainModule],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
