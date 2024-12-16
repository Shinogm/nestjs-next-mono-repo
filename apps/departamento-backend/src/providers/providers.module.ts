import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PinoLoggerModule } from './logger/pino/pino.module';
const modules = [DatabaseModule, PinoLoggerModule];
@Module({
  imports: modules,
  exports: modules,
})
export class ProvidersModule {}
