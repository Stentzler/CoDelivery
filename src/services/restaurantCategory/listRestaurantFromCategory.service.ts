import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { RestaurantCategory } from '../../entities/restaurantCategory.entity';
import { AppError } from '../../errors/AppError';

const listRestaurantFromCategoryService = async (categoryId: string) => {
  const restaurantCategoryRepo =
    AppDataSource.getRepository(RestaurantCategory);
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurantCatList = await restaurantCategoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!restaurantCatList) {
    throw new AppError('Restaurant category not found!', 404);
  }

  const allRestaurants = await restaurantRepo.find({
    relations: { category: true },
  });
  const allRestaurantsCat = allRestaurants.filter(
    (restaurant) => restaurant.category.id === categoryId
  );

  return allRestaurantsCat;
};

export { listRestaurantFromCategoryService };
