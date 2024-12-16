import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DomainModule } from 'src/domain/domain.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DomainModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
