import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';

const listRestaurantService = async (): Promise<Restaurant[]> => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurants = await restaurantRepo.find();

  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.isActive === true
  );

  return filteredRestaurants;
};

export { listRestaurantService };
