import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Restaurant } from '../../entities/restaurant.entity';
import { AppError } from '../../errors/AppError';

const updateRestaurantService = async (id: string, data: any) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const addressRepo = AppDataSource.getRepository(Address);

  const restaurant = await restaurantRepo.findOne({ where: { id } });

  if (!restaurant) {
    throw new AppError('Restaurant not found', 404);
  }

  if (typeof data !== 'object') {
    throw new AppError('Request format is not an object', 400);
  }

  if (
    data.id ||
    data.createdAt ||
    data.updatedAt ||
    data.isRestaurant ||
    data.isActive ||
    data.category
  ) {
    throw new AppError('Those changes are not allowed', 403);
  }

  if (data.cnpj) {
    const cnpjChecker = await restaurantRepo.findOne({
      where: { cnpj: data.cnpj },
    });

    if (cnpjChecker) {
      throw new AppError('Given CNPJ is already being used', 409);
    }
  }

  try {
    data.updatedAt = new Date();

    if (data.address) {
      const targetAddress = await addressRepo.findOne({
        where: { zipCode: restaurant.address.zipCode },
      });

      await addressRepo.update(targetAddress!.id, {
        ...targetAddress,
        ...data.address,
      });
      delete data.address;
    }

    await restaurantRepo.update(restaurant.id, { ...restaurant, ...data });

    return true;
  } catch (error) {
    throw new AppError('Request has invalid properties', 422);
  }
};

export { updateRestaurantService };
