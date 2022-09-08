import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IRestaurantCreate } from '../../interfaces/restaurants';
import { restaurantAddressSchema } from '../restaurantAddress/restaurantAddress.schemas';

const restaurantSchema: SchemaOf<IRestaurantCreate> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cnpj: yup.string().required(),
  img_url: yup.string(),
  category: yup.string().required(),
  restaurant_address: yup.object(restaurantAddressSchema),
});

export { restaurantSchema };
