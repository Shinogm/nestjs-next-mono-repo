import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModuleEntity } from '../../modules/products.module';
import { ProductsAdapterApi } from './products.adapter.api';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  IProducts,
  IProductsImage,
} from '../../entities/products/product.interface';
import { Injectable } from '@nestjs/common';
import {
  DepartamentEntity,
  DepartmentImage,
} from '../../entities/products/product.entity';

@Injectable()
export class ProductsAdapter implements ProductsAdapterApi {
  constructor(
    @InjectRepository(DepartamentEntity)
    private readonly repository: Repository<DepartamentEntity>,

    @InjectRepository(DepartmentImage)
    private readonly imageRepository: Repository<DepartmentImage>,
  ) {}

  async create(product: Partial<IProducts>): Promise<IProducts> {
    const newProduct = this.repository.create({
      nombre: product.nombre,
      direccion: product.direccion,
      telefono: product.telefono,
      rooms: product.rooms,
      huesped: product.huesped,
      price: product.price,
    });
    return this.repository.save(newProduct);
  }

  async findOne(
    id: FindOptionsWhere<ProductsModuleEntity>,
  ): Promise<IProducts | null> {
    const find = await this.repository.findOne({
      where: id,
      relations: ['images'], // Cargar las imágenes asociadas
    });

    if (!find) return null;

    return {
      ...find,
      image:
        find.images.length > 0 ? find.images[0].imagen.toString('base64') : '',
    };
  }

  async findAllImages(
    id: FindOptionsWhere<DepartmentImage>,
  ): Promise<IProducts[]> {
    const find = await this.repository.find({
      where: id,
      relations: ['images'],
    });

    return find.map((dept) => ({
      ...dept,
      images: dept.images.map((image) => ({
        id: image.id,
        imagen: image.imagen.toString('base64'),
      })),
    }));
  }

  async findAll(): Promise<any[]> {
    const departments = await this.repository.find({
      relations: ['images', 'purchased'], // Aquí debes usar 'purchased' en vez de 'purchase'
    });

    return departments.map((dept) => ({
      ...dept,
      images: dept.images.map((image) => ({
        id: image.id,
        imagen: image.imagen.toString('base64'), // Convierte la imagen en base64
      })),
      purchased: dept.purchased.length > 0 ? true : false,
    }));
  }

  async update(id: number, product: Partial<IProducts>): Promise<IProducts> {
    await this.repository.update(id, product);
    return await this.findOne({
      id: id,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async createImage(id: number, image: Buffer): Promise<IProductsImage> {
    const newImage = this.imageRepository.create({
      departament_id: id,
      imagen: image,
    });
    return await this.imageRepository.save(newImage);
  }

  async findImages(
    id: FindOptionsWhere<DepartmentImage>,
  ): Promise<IProductsImage[]> {
    return await this.imageRepository.find({ where: id });
  }

  async deleteImage(id: number, imageId: number): Promise<void> {
    await this.imageRepository.delete(imageId);
  }
}
