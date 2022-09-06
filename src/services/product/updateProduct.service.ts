import { AppError } from "../../errors/AppError";
import { IProductRequest } from "../../interfaces/product/product.interface";
import { productRepository } from "./productRepository";

const updateProductService = async (
  id: string,
  {
    name,
    description,
    price,
    img_url,
    is_available,
    categoryId,
    restaurantId,
  }: IProductRequest
) => {
  const findProduct = await productRepository.findOneBy({ id });
  if (!findProduct) {
    throw new AppError("Product not find", 404);
  }
  const updatedProduct = await productRepository.update(id, {
    name: name ? name : findProduct.name,
    description: description ? description : findProduct.description,
    price: price ? price : findProduct.price,
    img_url: img_url ? img_url : findProduct.img_url,
    is_available: is_available ? is_available : findProduct.is_available,
    categoryId: categoryId ? categoryId : findProduct.categoryId,
    restaurantId: restaurantId ? restaurantId : findProduct.restaurantId,
  });
  const product = await productRepository.findOneBy({ id });
  return product;
};

export { updateProductService };
