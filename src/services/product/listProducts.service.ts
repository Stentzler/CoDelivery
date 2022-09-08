import { productRepository, restaurantRepository } from './repositories';

const listProductsService = async (id: string) => {
  if (id) {
    const product = await productRepository.findOne({
      where: { id },
      relations: { category: true, restaurant: true },
    });
    return product;
  }

  const products = await productRepository.find({
    where: { id: id },
  });
  return products;
};
export { listProductsService };
