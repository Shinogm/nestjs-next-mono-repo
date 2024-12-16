import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerRequest } from '../interfaces/create-seller.request';
import { IPurchased } from 'src/domain/tables/entities/seller/purchased.interface';
import { SellerAdapterApi } from 'src/domain/tables/adapters/seller/seller.adapter.api';
import { UpdateSellerRequest } from '../interfaces/update-sellet.request';

@Injectable()
export class SellerService {
  constructor(private readonly sellerAdapter: SellerAdapterApi) {}

  async create(seller: CreateSellerRequest): Promise<IPurchased> {
    return await this.sellerAdapter.create({
      departamento_id: seller.departamento_id,
      user_id: seller.user_id,
      amount: seller.amount,
      quantity: seller.quantity ?? 1,
    });
  }

  async findOne(id: number): Promise<IPurchased> {
    const findSeller = await this.sellerAdapter.findOne({ id: id });
    if (!findSeller) {
      throw new HttpException('Seller not found', 404);
    }
    return findSeller;
  }

  async findAll(): Promise<IPurchased[]> {
    return await this.sellerAdapter.findAll();
  }

  async update(id: number, seller: UpdateSellerRequest): Promise<IPurchased> {
    const findSeller = await this.sellerAdapter.findOne({ id: id });
    const partialSeller: Partial<IPurchased> = {
      departamento_id: seller.departamento_id ?? findSeller.departamento_id,
      user_id: seller.user_id ?? findSeller.user_id,
      amount: seller.amount ?? findSeller.amount,
      quantity: seller.quantity ?? findSeller.quantity,
    };
    await this.sellerAdapter.update(id, partialSeller);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    return await this.sellerAdapter.delete(id);
  }
}
