import { IAddressInfoRequest } from "../addresses";
import { ICartInfoRequest } from "../cart";
import { IPaymentInfoRequest } from "../paymentInfo";






export interface IUserRequest {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  addressInfo: IAddressInfoRequest;
  paymentInfo: IPaymentInfoRequest ;
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

