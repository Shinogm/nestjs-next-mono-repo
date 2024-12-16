import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/users/user.entity';
import { UserAdapterApi } from './user.adapter.api';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IUserInterface } from '../../entities/users/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdapter implements UserAdapterApi {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<IUserInterface>): Promise<IUserInterface> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async findOne(id: FindOptionsWhere<UserEntity>): Promise<IUserInterface> {
    return await this.repository.findOne({ where: id });
  }

  async findAll(): Promise<IUserInterface[]> {
    return await this.repository.find();
  }

  async update(
    id: number,
    user: Partial<IUserInterface>,
  ): Promise<IUserInterface> {
    await this.repository.update(id, user);
    return await this.findOne({
      id: id,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
