import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IProducts } from './product.interface';
import { PurchasedEntity } from '../seller/purchased.entity';

@Entity({
  name: 'departament',
})
export class DepartamentEntity implements IProducts {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'direccion' })
  direccion: string;

  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  @Column({ name: 'huesped', type: 'int' })
  huesped: number;

  @Column({ name: 'rooms', type: 'int' })
  rooms: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => PurchasedEntity, (purchased) => purchased.departamento)
  purchased: PurchasedEntity[];

  @OneToMany(() => DepartmentImage, (image) => image.departament)
  images: DepartmentImage[];
}

@Entity('department_images')
export class DepartmentImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'imagen', type: 'longblob' })
  imagen: Buffer;

  @Column({ name: 'departament_id', type: 'int' })
  departament_id: number;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.id)
  @JoinColumn({ name: 'departament_id' })
  departament: DepartamentEntity;
}
