import { IPurchased } from '../seller/purchased.interface';

export interface IProducts {
  id: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  rooms: number;
  huesped: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  image?: string; // Mantener 'image' como un string
  purchase?: IPurchased;
}

export interface IProductsImage {
  id: number;
  departament_id: number;
  imagen: Buffer;
  created_at?: Date;
}
