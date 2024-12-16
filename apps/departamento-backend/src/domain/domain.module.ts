import { Module } from '@nestjs/common';
import { TablesModule } from './tables/tables.module';

const modules = [TablesModule];
@Module({
  imports: modules,
  exports: modules,
})
export class DomainModule {}
