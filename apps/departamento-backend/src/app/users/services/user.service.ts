import { HttpException, Injectable } from '@nestjs/common';
import { UserAdapterApi } from 'src/domain/tables/adapters/users/user.adapter.api';
import {
  IUserInterface,
  SellerTypes,
} from 'src/domain/tables/entities/users/user.interface';
import { CreateUserRequest } from '../interfaces/create-user.request';
import { UpdateUserRequest } from '../interfaces/update-user.request';

@Injectable()
export class UserService {
  constructor(private readonly userAdapter: UserAdapterApi) {}

  async create(user: CreateUserRequest): Promise<IUserInterface> {
    return await this.userAdapter.create({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password ?? '',
      is_seller: user.is_seller ?? SellerTypes.CLIENT,
    });
  }

  async findOne(id: number): Promise<IUserInterface> {
    const findUser = await this.userAdapter.findOne({ id: id });
    if (!findUser) {
      throw new HttpException('User not found', 404);
    }
    return findUser;
  }

  async findAll(): Promise<IUserInterface[]> {
    return await this.userAdapter.findAll();
  }

  async update(id: number, user: UpdateUserRequest): Promise<IUserInterface> {
    const findUser = await this.userAdapter.findOne({ id: id });
    const partialUser: Partial<IUserInterface> = {
      nombre: user.nombre ?? findUser.nombre,
      apellido: user.apellido ?? findUser.apellido,
      email: user.email ?? findUser.email,
      password: user.password ?? findUser.password,
      is_seller: user.is_seller ?? findUser.is_seller,
    };
    await this.userAdapter.update(id, partialUser);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    return await this.userAdapter.delete(id);
  }
}
