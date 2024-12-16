import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users/user.entity';
import { UserAdapterProvider } from '../adapters/users';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: UserAdapterProvider,
  exports: UserAdapterProvider,
})
export class UserModuleEntity {}
