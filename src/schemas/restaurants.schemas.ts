import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRestaurantCreate } from "../interfaces/restaurants";

const restaurantSchema: SchemaOf<IRestaurantCreate> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  isRestaurant: yup.boolean().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cnpj: yup.string().required(),
  category: yup.string().required(),
  restaurant_address: yup.object({
    address: yup.string().required(),
    number: yup.string().required(),
    phoneNumber: yup.string().required(),
    zipCode: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    complement: yup.string(),
  }),
});

export { restaurantSchema };
