import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { AppError } from '../../errors/AppError';

const listTargetRestaurantService = async (id: string) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepo.findOne({
    where: { id },
    relations: { category: true },
  });

  if (!restaurant) {
    throw new AppError('Restaurant not found', 404);
  }

  return restaurant;
};

export { listTargetRestaurantService };
