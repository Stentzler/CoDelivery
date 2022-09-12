import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { RestaurantAddress } from '../../entities/restaurantAddress.entity';
import { AppError } from '../../errors/AppError';
import bcrypt from 'bcrypt';

const updateRestaurantService = async (id: string, data: any) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const addressRepo = AppDataSource.getRepository(RestaurantAddress);

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
    data.category ||
    data.address?.id
  ) {
    throw new AppError('Those changes are not allowed', 403);
  }

  if (data.name) {
    const nameChecker = await restaurantRepo.findOne({
      where: { name: data.name },
    });

    if (nameChecker) {
      throw new AppError('Given name is already registered', 409);
    }
  }

  if (data.email) {
    const emailChecker = await restaurantRepo.findOne({
      where: { email: data.email },
    });

    if (emailChecker) {
      throw new AppError('Given email is already being used', 409);
    }
  }

  if (data.cnpj) {
    const cnpjChecker = await restaurantRepo.findOne({
      where: { cnpj: data.cnpj },
    });

    if (cnpjChecker) {
      throw new AppError('Given CNPJ is already being used', 409);
    }
  }

  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
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
