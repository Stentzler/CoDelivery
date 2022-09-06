import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  img_url: yup.string().required(),
  categoryId: yup.string().required(),
  restaurantId: yup.string().required(),
});

export { productSchema };
