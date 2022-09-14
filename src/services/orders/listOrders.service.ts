import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {Cart} from '../../entities/cart.entity';
import {Order} from '../../entities/order.entity';
import {AppError} from '../../errors/AppError';
import {Products} from '../../entities/products.entity';

const listOrdersService = async (id: string, isRestaurant: boolean) => {
	const orderRepository = AppDataSource.getRepository(Order);

	if (isRestaurant) {
		const restaurantOrders = await orderRepository.find({
			relations: {restaurant: true},
			where: {restaurant: {id}},
		});
		return restaurantOrders;
	}

	const userOrders = await orderRepository.find({relations: {user: true}, where: {user: {id}}});
	return userOrders;
};

export {listOrdersService};
