import { AppError } from "../../errors/AppError";
import { IProductRequest } from "../../interfaces/product/product.interface";
import {
  categoryRepository,
  productRepository,
  restaurantRepository,
} from "./repositories";

const updateProductService = async (
  id: string,
  isRestaurant: boolean,
  {
    name,
    description,
    price,
    img_url,
    isAvailable,
    category,
    restaurant,
  }: IProductRequest
) => {
  const findProduct = await productRepository.findOneBy({ id: id });
  const findCategory = await categoryRepository.findOneBy({ id: category });
  const findRestaurant = await restaurantRepository.findOneBy({
    id: restaurant,
  });

  if (!isRestaurant) {
    throw new AppError("This product does not belong to this restaurant", 403);
  }
  if (!findProduct) {
    throw new AppError("Product not find", 404);
  }
  if (!findCategory) {
    throw new AppError("Product not find", 404);
  }

  if (!findRestaurant) {
    throw new AppError("Product not find", 404);
  }
  const updatedProduct = await productRepository.update(id, {
    name: name ? name : findProduct.name,
    description: description ? description : findProduct.description,
    price: price ? price : findProduct.price,
    img_url: img_url ? img_url : findProduct.img_url,
    isAvailable: isAvailable ? isAvailable : findProduct.isAvailable,
  });
  const product = await productRepository.findOneBy({ id });
  return product;
};

export { updateProductService };
