import AppDataSource from "../../data-source";
import { Restaurant } from "../../entities/restaurant.entity";
import { RestaurantAddress } from "../../entities/restaurantAddress.entity";
import { AppError } from "../../errors/AppError";

const updateRestaurantService = async (id: string, data: any) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const restaurantAddressRepo = AppDataSource.getRepository(RestaurantAddress);

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
    data.updatedAt = new Date();

    if (data.restaurant_address) {
      const targetAddress = await restaurantAddressRepo.findOne({
        where: { zipCode: restaurant.restaurantAddress.zipCode },
      });

      await restaurantAddressRepo.update(targetAddress!.id, {
        ...targetAddress,
        ...data.restaurant_address,
      });
      delete data.restaurant_address;
    }

    await restaurantRepo.update(restaurant.id, { ...restaurant, ...data });

    return true;
  } catch (error) {
    throw new AppError("Request has invalid properties", 422);
  }
};

export { updateRestaurantService };
