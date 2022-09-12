import { ICartInfoRequest } from '../cart';


export interface IUserRequest {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  
}

export interface IUserResponse {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  isRestaurant: boolean;
  addressInfo: string;
  cart: ICartInfoRequest;
  paymentInfo: string;
  createdAt: Date;
  updatedAt: Date;
}
