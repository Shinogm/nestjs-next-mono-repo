import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserService } from './services/user.service';
import { CreateUserRequest } from './interfaces/create-user.request';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly userService: UserService,
  ) {
    this.logger.setContext(UserController.name);
  }
  @Post()
  async create(@Body() user: CreateUserRequest) {
    return await this.userService.create(user);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param() id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateUserRequest })
  async update(@Param() id: number, @Body() user: CreateUserRequest) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Param() id: number) {
    return await this.userService.delete(id);
  }
}
