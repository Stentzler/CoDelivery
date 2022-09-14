import { AppError } from '../../errors/AppError';
import { productRepository } from './repositories';

const deleteProductService = async (id: string, restaurantId: string) => {
  const productVerifyExist = await productRepository.findOneBy({ id: id });

  if (!productVerifyExist) {
    throw new AppError('Product not found', 404);
  }

  const [findProduct] = await productRepository.find({
    relations: { restaurant: true },
    where: { id: id },
  });

  if (restaurantId !== findProduct.restaurant.id) {
    throw new AppError('This product does not belong to this restaurant', 403);
  }

  const deletedProduct = productRepository
    .createQueryBuilder()
    .delete()
    .where({ id: id })
    .execute();

  return deletedProduct;
};

export { deleteProductService };
