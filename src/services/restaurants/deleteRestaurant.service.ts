import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { AppError } from '../../errors/AppError';

const deleteRestaurantService = async (id: string) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepo.findOne({ where: { id } });

  if (!restaurant) {
    throw new AppError('Restaurant not found', 404);
  }

  if (!restaurant.isActive) {
    throw new AppError('Restaurant is already inactive', 409);
  }

  await restaurantRepo.update(restaurant.id, { isActive: false });
  // await restaurantRepo.delete(restaurant.id);

  return true;
};

export { deleteRestaurantService };
