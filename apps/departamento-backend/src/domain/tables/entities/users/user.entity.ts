import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUserInterface, SellerTypes } from './user.interface';
import { PurchasedEntity } from '../seller/purchased.entity';

@Entity({
  name: 'usuarios',
})
export class UserEntity implements IUserInterface {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'nombre',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    name: 'apellido',
    nullable: true,
  })
  apellido: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'enum',
    name: 'is_seller',
    enum: SellerTypes,
  })
  is_seller: SellerTypes;

  @OneToMany(() => PurchasedEntity, (purchased) => purchased.user)
  purchased: PurchasedEntity[]; // Relación de uno a muchos con PurchasedEntity
}
