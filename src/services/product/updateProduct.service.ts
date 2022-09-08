import { AppError } from '../../errors/AppError';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  categoryRepository,
  productRepository,
  restaurantRepository,
} from './repositories';

const updateProductService = async (
  id: string,
  restaurantId: string,
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
  const findProduct = await productRepository.findOne({
    where: { id },
    relations: { restaurant: true },
  });
  const findCategory = await categoryRepository.findOneBy({ id: category });
  const findRestaurant = await restaurantRepository.findOneBy({
    id: restaurantId,
  });

  if (!findProduct) {
    throw new AppError('Product not found', 404);
  }

  if (!findCategory) {
    throw new AppError('Category not found', 404);
  }

  if (!findRestaurant) {
    throw new AppError('Restaurant not found', 404);
  }
  console.log('Vibe check');

  if (findProduct?.restaurant.id !== findRestaurant?.id) {
    throw new AppError('This product does not belong to given restaurant', 403);
  }

  const nameDupeChecker = await productRepository.findOne({ where: { name } });

  if (nameDupeChecker) {
    throw new AppError('Product name has already been registered', 409);
  }

  const updatedProduct = await productRepository.update(findProduct.id, {
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
