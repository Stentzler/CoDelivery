import * as yup from "yup";


const restaurantAddressSchema = {
  address: yup.string().required(),
  number: yup.string().required(),
  phoneNumber: yup.string().required(),
  zipCode: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  complement: yup.string(),
};

export { restaurantAddressSchema };
