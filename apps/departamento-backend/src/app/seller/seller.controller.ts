import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateSellerRequest } from './interfaces/create-seller.request';
import { PinoLogger } from 'nestjs-pino';
import { SellerService } from './services/seller.service';

@Controller('seller')
export class SellerController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly sellerService: SellerService,
  ) {
    this.logger.setContext(SellerController.name);
  }

  @Post()
  @ApiBody({ type: CreateSellerRequest })
  async create(@Body() seller: CreateSellerRequest) {
    return await this.sellerService.create(seller);
  }

  @Get()
  async findAll() {
    return await this.sellerService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param() id: number) {
    return await this.sellerService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateSellerRequest })
  async update(@Param() id: number, @Body() seller: CreateSellerRequest) {
    return await this.sellerService.update(id, seller);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Param() id: number) {
    return await this.sellerService.delete(id);
  }
}
