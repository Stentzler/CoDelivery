import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { Restaurant } from "../../entities/restaurant.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteOrderService = async (
  userId: string,
  id: string,
  isRestaurant: boolean
) => {
  const orderRepository = AppDataSource.getRepository(Order);
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const userRepository = AppDataSource.getRepository(Users);

  const order = await orderRepository.findOne({
    where: { id: id },
    relations: { user: true },
  });
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (isRestaurant) {
    const restaurant = await restaurantRepository.findOne({
      where: { id: userId },
    });
    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }
    if (restaurant.id !== order.restaurant.id) {
      throw new AppError(
        'Deletion not allowed, this order does not belong to this restaurant',
        401
      );
    }

    await orderRepository.delete(order.id);
    return true;
  } else {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (user.id !== order.user.id) {
      throw new AppError(
        'Deletion not allowed, this order does not belong to this user',
        401
      );
    }
    await orderRepository.delete(order.id);
    return true;
  }


};

export { deleteOrderService };
