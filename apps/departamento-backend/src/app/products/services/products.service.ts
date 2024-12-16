import { HttpException, Injectable } from '@nestjs/common';
import { IProducts } from 'src/domain/tables/entities/products/product.interface';
import { ProductsAdapterApi } from 'src/domain/tables/adapters/products/products.adapter.api';
import { UpdateProductsRequest } from '../interfaces/update-products.request';
import { CreateProductsRequest } from '../interfaces/create-products.request';

@Injectable()
export class ProductsService {
  constructor(private readonly productsAdapter: ProductsAdapterApi) {}

  async create(products: CreateProductsRequest): Promise<IProducts> {
    const createdProducts = await this.productsAdapter.create({
      nombre: products.nombre,
      direccion: products.direccion,
      telefono: products.telefono,
      rooms: products.rooms,
      huesped: products.huesped,
      price: products.price,
    });

    return createdProducts;
  }

  async createImage(id: number, image: Buffer) {
    await this.productsAdapter.findOne({ id: id });

    await this.productsAdapter.createImage(id, image);
    return new HttpException('Image created', 201);
  }

  async findOne(id: number): Promise<IProducts> {
    const findProducts = await this.productsAdapter.findOne({ id: id });
    if (!findProducts) {
      throw new HttpException('Products not found', 404);
    }
    return findProducts;
  }

  async findAll(): Promise<IProducts[]> {
    return await this.productsAdapter.findAll();
  }

  async findAllImages(id: number): Promise<IProducts[]> {
    return await this.productsAdapter.findAllImages({ id: id });
  }

  async update(
    id: number,
    products: UpdateProductsRequest,
  ): Promise<IProducts> {
    const findProducts = await this.productsAdapter.findOne({ id: id });
    const partialProducts: Partial<IProducts> = {
      nombre: products.nombre ?? findProducts.nombre,
      telefono: products.telefono ?? findProducts.telefono,
      direccion: products.direccion ?? findProducts.direccion,
    };
    await this.productsAdapter.update(id, partialProducts);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    return await this.productsAdapter.delete(id);
  }
}
