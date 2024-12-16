import { Module } from '@nestjs/common';

// ** Database modules
import { ConnectionModule } from './connection/connection.module';

// ** Database modules declarations
const modules = [ConnectionModule];

@Module({
  imports: modules,
  exports: modules,
})
export class DatabaseModule {}
