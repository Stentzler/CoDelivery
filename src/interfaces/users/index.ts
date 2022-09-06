import { IAddressInfoRequest } from "../addresses";
import { ICartInfoRequest } from "../cart";
import { IPaymentInfoRequest } from "../paymentInfo";






export interface IUserRequest {
  full_name: string;
  username: string;
  email: string;
  password: string;
  isRestaurant: boolean;
  address_info: IAddressInfoRequest;
  payment_info: IPaymentInfoRequest ;
}

export interface IUserResponse {
  id: string;
  full_name: string;
  username: string;
  email: string;
  isRestaurant: boolean;
  address_info: string;
  cart: ICartInfoRequest;
  payment_info: string;
  createdAt: Date;
  updatedAt: Date;
}

