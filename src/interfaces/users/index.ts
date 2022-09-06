export interface IUserRequest {
    full_name: string;
    username: string;
    email: string;
    password: string;
    isRestaurant: boolean;
    address_infoid:string;
    cartid:string;
    payment_infoid:string
  }

  export interface IUserResponse {
    id: string;
    full_name: string;
    username: string;
    email: string;
    isRestaurant: boolean;
    address_infoid:string;
    cartid:string;
    payment_infoid:string
    createdAt: Date;
    updatedAt: Date;
  }


  export interface IUserLogin {
    email: string;
    password: string;
  }
  