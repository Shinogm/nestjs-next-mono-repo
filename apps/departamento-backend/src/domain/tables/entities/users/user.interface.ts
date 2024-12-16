export enum SellerTypes {
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
}

export interface IUserInterface {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  is_seller: SellerTypes;
}
