import { productRepository, restaurantRepository } from './repositories';
import { AppError } from '../../errors/AppError';

const listProductsService = async (id: string) => {
  if (id) {
    const product = await productRepository.findOne({
      where: { id },
      relations: { category: true, restaurant: true },
    });
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  const products = await productRepository.find();
  return products;
};
export { listProductsService };
