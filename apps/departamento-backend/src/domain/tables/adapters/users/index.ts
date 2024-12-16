import { Provider } from '@nestjs/common';
import { UserAdapterApi } from './user.adapter.api';
import { UserAdapter } from './user.adapter';

export const UserAdapterProvider: Provider[] = [
  UserAdapter,
  {
    provide: UserAdapterApi,
    useClass: UserAdapter,
  },
];
