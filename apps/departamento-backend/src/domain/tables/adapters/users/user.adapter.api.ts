import { FindOptionsWhere } from 'typeorm';
import { IUserInterface } from '../../entities/users/user.interface';
import { UserEntity } from '../../entities/users/user.entity';

export abstract class UserAdapterApi {
  abstract create(user: Partial<IUserInterface>): Promise<IUserInterface>;
  abstract findOne(id: FindOptionsWhere<UserEntity>): Promise<IUserInterface>;
  abstract findAll(): Promise<IUserInterface[]>;
  abstract update(
    id: number,
    user: Partial<IUserInterface>,
  ): Promise<IUserInterface>;
  abstract delete(id: number): Promise<void>;
}
