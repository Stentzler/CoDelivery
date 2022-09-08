import { productRepository } from './repositories';

const listProductsService = async (id: string) => {
  if (id) {
    const product = await productRepository.findOne({
      where: { id },
      relations: { category: true, restaurant: true },
    });
    return product;
  }

  const products = await productRepository.find();
  return products;
};
export { listProductsService };
