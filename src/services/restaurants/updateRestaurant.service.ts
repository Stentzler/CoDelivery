import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";
import { AppError } from "../../errors/AppError";

const updateRestaurantService = async (id: string, data: any) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepo.findOne({ where: { id } });

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  if (typeof data !== "object") {
    throw new AppError("Request format is not an object", 400);
  }

  try {
    await restaurantRepo.update(restaurant.id, { ...restaurant, ...data });

    return true;
  } catch (error) {
    throw new AppError("Request has invalid properties", 422);
  }
};

export { updateRestaurantService };
