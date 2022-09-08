import AppDataSource from '../../data-source';
import { AppError } from '../../errors/AppError';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  categoryRepository,
  productRepository,
  restaurantRepository,
} from './repositories';

const createProductService = async ({
  name,
  description,
  price,
  img_url = 'https://res.cloudinary.com/dffnwue8t/image/upload/v1662581503/l4kg5doufmuuyvgrgj7u.png',
  category,
  restaurant,
}: IProductRequest) => {
  const findCategory = await categoryRepository.findOneBy({ name: category });
  const findRestaurant = await restaurantRepository.findOneBy({
    id: restaurant,
  });

  if (!findCategory) {
    throw new AppError('Category not found', 404);
  }

  if (!findRestaurant) {
    throw new AppError('Restaurant not found', 404);
  }

  const productDupe = await productRepository.findOne({ where: { name } });

  if (productDupe) {
    throw new AppError('Product name is already registered', 409);
  }

  const newProduct = productRepository.create({
    name,
    description,
    price,
    img_url,
    category: findCategory,
    restaurant: findRestaurant,
  });

  await productRepository.save(newProduct);

  return newProduct;
};

export { createProductService };
