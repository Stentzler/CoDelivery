import AppDataSource from '../../data-source';
import { AppError } from '../../errors/AppError';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  categoryRepository,
  productRepository,
  restaurantRepository,
} from './repositories';

const createProductService = async (
  {
    name,
    description,
    price,
    img_url = 'https://res.cloudinary.com/dffnwue8t/image/upload/v1662581503/l4kg5doufmuuyvgrgj7u.png',
    category,
  }: IProductRequest,
  restarauntId: string
) => {
  const findCategory = await categoryRepository.findOneBy({ name: category });
  const findRestaurant = await restaurantRepository.findOneBy({
    id: restarauntId,
  });

  if (!findCategory) {
    throw new AppError('Category not found', 404);
  }

  if (!findRestaurant) {
    throw new AppError('Restaurant not found', 404);
  }

  const productRepo = await productRepository.find({
    relations: { restaurant: true },
  });

  const restaurantProducts = productRepo.filter(
    (product) => product.restaurant.id === findRestaurant.id
  );

  const productDupe = restaurantProducts.filter(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );

  if (productDupe.length > 0) {
    throw new AppError('Product has already been registered', 409);
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
