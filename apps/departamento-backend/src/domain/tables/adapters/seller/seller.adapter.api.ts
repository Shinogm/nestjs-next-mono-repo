import { FindOptionsWhere } from 'typeorm';
import { IPurchased } from '../../entities/seller/purchased.interface';

export abstract class SellerAdapterApi {
  abstract create(seller: Partial<IPurchased>): Promise<IPurchased>;
  abstract findOne(id: FindOptionsWhere<IPurchased>): Promise<IPurchased>;
  abstract findAll(): Promise<IPurchased[]>;
  abstract update(id: number, seller: Partial<IPurchased>): Promise<IPurchased>;
  abstract delete(id: number): Promise<void>;
}
