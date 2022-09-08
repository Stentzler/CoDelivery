export interface IRestaurantAdress {
  address: string;
  number: string;
  phoneNumber: string;
  zipCode: string;
  city: string;
  state: string;
  complement?: string;
}

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
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  category: IRestaurantCategory;
  restaurantAddress: IRestaurantAdress;
}

export interface IRestaurantCreate {
  name: string;
  description: string;
  email: string;
  password: string;
  cnpj: string;
  img_url: string | undefined;
  category: string;
  restaurantAddress: IRestaurantAdress;
}

export interface IRestaurantLogin {
  email: string;
  password: string;
}
