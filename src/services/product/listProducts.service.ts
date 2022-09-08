import { productRepository } from "./repositories";

const listProductsService = async (id: string) => {
  if (id) {
    const Products = await productRepository.findOneBy({ id: id });
    return Products;
  }
  const Products = await productRepository.find();
  return Products;
};
export { listProductsService };
