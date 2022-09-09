import { IAddressInfoRequest } from '../addresses';
import { ICartInfoRequest } from '../cart';
import { IPaymentInfoRequest } from '../paymentInfo';

export interface IUserRequest {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  address: IAddressInfoRequest;
  paymentInfo: IPaymentInfoRequest;
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
