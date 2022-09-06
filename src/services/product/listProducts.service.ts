import { productRepository } from "./productRepository";

const listProductsService = async () => {
  const Products = await productRepository.find();
  return Products;
};
export { listProductsService };
