import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IPurchased } from './purchased.interface';
import { DepartamentEntity } from '../products/product.entity';
import { UserEntity } from '../users/user.entity';

@Entity({
  name: 'purchased',
})
export class PurchasedEntity implements IPurchased {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'int',
    name: 'departamento_id',
  })
  departamento_id: number;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.purchased)
  @JoinColumn({ name: 'departamento_id' }) // Explicitly define the join column
  departamento: DepartamentEntity;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.purchased)
  @JoinColumn({ name: 'user_id' }) // Explicitly define the join column
  user: UserEntity;

  @Column({
    type: 'decimal',
    name: 'amount',
  })
  amount: number;

  @Column({
    type: 'int',
    name: 'quantity',
  })
  quantity: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
