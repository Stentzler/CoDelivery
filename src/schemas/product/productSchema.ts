import * as yup from 'yup';

const productSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  img_url: yup.string(),
  category: yup.string().required(),
  restaurant: yup.string(),
});

export { productSchema };
