import { FindOptionsWhere } from 'typeorm';
import { ProductsModuleEntity } from '../../modules/products.module';
import {
  IProducts,
  IProductsImage,
} from '../../entities/products/product.interface';
import { DepartmentImage } from '../../entities/products/product.entity';

export abstract class ProductsAdapterApi {
  abstract create(product: Partial<IProducts>): Promise<IProducts>;
  abstract findOne(
    id: FindOptionsWhere<ProductsModuleEntity>,
  ): Promise<IProducts>;
  abstract findAll(): Promise<IProducts[]>;
  abstract update(id: number, product: Partial<IProducts>): Promise<IProducts>;
  abstract delete(id: number): Promise<void>;
  abstract findAllImages(
    id: FindOptionsWhere<DepartmentImage>,
  ): Promise<IProducts[]>;

  abstract createImage(id: number, image: Buffer): Promise<IProductsImage>;
  abstract findImages(
    id: FindOptionsWhere<DepartmentImage>,
  ): Promise<IProductsImage[]>;
  abstract deleteImage(id: number, imageId: number): Promise<void>;
}
