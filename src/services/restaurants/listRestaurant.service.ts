import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";

const listRestaurantService = async (): Promise<Restaurant[]> => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurants = await restaurantRepo.find();

  return restaurants;
};

export { listRestaurantService };
