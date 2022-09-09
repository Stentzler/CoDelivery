import * as yup from 'yup';

const restaurantAddressSchema = {
  street: yup.string().required(),
  number: yup.string().required(),
  zipCode: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  complement: yup.string(),
};

export { restaurantAddressSchema };
