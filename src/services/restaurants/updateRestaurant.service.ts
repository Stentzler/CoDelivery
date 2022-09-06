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

  if (
    data.id ||
    data.created_at ||
    data.updated_at ||
    data.isRestaurant ||
    data.isActive
  ) {
    throw new AppError("Those changes are not allowed", 403);
  }

  try {
    // data.updated_at = new Date();
    await restaurantRepo.update(restaurant.id, { ...restaurant, ...data });

    return true;
  } catch (error) {
    throw new AppError("Request has invalid properties", 422);
  }
};

export { updateRestaurantService };
