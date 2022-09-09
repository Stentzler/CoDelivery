// export interface IRestaurantAdress {
//   address: string;
//   number: string;
//   zipCode: string;
//   city: string;
//   state: string;
//   complement?: string;
// }

import { Address } from '../../entities/address.entity';
import { IAddressInfoRequest } from '../addresses';

interface IRestaurantCategory {
  name: string;
}

export interface IRestaurant {
  name: string;
  description: string;
  isRestaurant: boolean;
  avatar_url: string;
  email: string;
  password: string;
  cnpj: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  category: IRestaurantCategory;
  restaurantAddress: Address;
}

export interface IRestaurantCreate {
  name: string;
  description: string;
  email: string;
  password: string;
  cnpj: string;
  phoneNumber: string;
  img_url: string | undefined;
  category: string;
  address: IAddressInfoRequest;
}

export interface IRestaurantLogin {
  email: string;
  password: string;
}
