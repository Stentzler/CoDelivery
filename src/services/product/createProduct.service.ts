import AppDataSource from "../../data-source";
import {
  IProductRequest,
  IProductResponse,
} from "../../interfaces/product/product.interface";
import { productRepository } from "./productRepository";

const createProductService = async ({
  name,
  description,
  price,
  img_url,
  is_available,
  categoryId,
  restaurantId,
}: IProductRequest) => {
  const newProduct = productRepository.create({
    name,
    description,
    price,
    img_url,
    is_available,
    categoryId,
    restaurantId,
  });
  await productRepository.save(newProduct);
  return newProduct;
};

export { createProductService };
