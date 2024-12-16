import { Provider } from '@nestjs/common';
import { SellerAdapter } from './seller.adapter';
import { SellerAdapterApi } from './seller.adapter.api';

export const SellerAdapterProvider: Provider[] = [
  SellerAdapter,
  {
    provide: SellerAdapterApi,
    useClass: SellerAdapter,
  },
];
