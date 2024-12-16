import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { CreateProductsRequest } from './interfaces/create-products.request';
import { ProductsService } from './services/products.service';
import { PinoLogger } from 'nestjs-pino';
import {
  FileInterceptor,
  MulterFile,
} from '@webundsoehne/nest-fastify-file-upload';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly productsService: ProductsService,
  ) {
    this.logger.setContext(ProductsController.name);
  }

  @Post()
  @ApiBody({ type: CreateProductsRequest })
  async create(@Body() createProductsDto: CreateProductsRequest) {
    return await this.productsService.create(createProductsDto);
  }

  @Post(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@Param('id') id: number, @UploadedFile() file: MulterFile) {
    return await this.productsService.createImage(id, file.buffer);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param() id: number) {
    return await this.productsService.findOne(id);
  }

  @Get('images/:id')
  @ApiParam({ name: 'id', type: 'number' })
  async findAllImages(@Param() id: number) {
    return await this.productsService.findAllImages(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateProductsRequest })
  async update(@Param() id: number, @Body() products: CreateProductsRequest) {
    return await this.productsService.update(id, products);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Param() id: number) {
    return await this.productsService.delete(id);
  }
}
