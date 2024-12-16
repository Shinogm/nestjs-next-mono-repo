import { Provider } from '@nestjs/common';
import { ProductsAdapter } from './products.adapter';
import { ProductsAdapterApi } from './products.adapter.api';

export const ProductsAdapterProvider: Provider[] = [
  ProductsAdapter,
  {
    provide: ProductsAdapterApi,
    useClass: ProductsAdapter,
  },
];
