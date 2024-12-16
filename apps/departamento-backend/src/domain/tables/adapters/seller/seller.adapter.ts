import { Injectable } from '@nestjs/common';
import { PurchasedEntity } from '../../entities/seller/purchased.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IPurchased } from '../../entities/seller/purchased.interface';
import { SellerAdapterApi } from './seller.adapter.api';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SellerAdapter implements SellerAdapterApi {
  constructor(
    @InjectRepository(PurchasedEntity)
    private readonly repository: Repository<PurchasedEntity>,
  ) {}

  async create(seller: Partial<IPurchased>): Promise<IPurchased> {
    const newSeller = this.repository.create(seller);
    console.log(newSeller);
    return await this.repository.save(newSeller);
  }

  async findOne(id: FindOptionsWhere<IPurchased>): Promise<IPurchased> {
    return await this.repository.findOne({ where: id });
  }

  async findAll(): Promise<IPurchased[]> {
    return await this.repository.find();
  }

  async update(id: number, seller: Partial<IPurchased>): Promise<IPurchased> {
    await this.repository.update(id, seller);
    return await this.findOne({
      id: id,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
