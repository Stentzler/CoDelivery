import AppDataSource from '../../data-source';
import {Order} from '../../entities/order.entity';

const listOrdersService = async (id: string, isRestaurant: boolean) => {
	console.log(id);

	const orderRepository = AppDataSource.getRepository(Order);

	if (isRestaurant) {
        const restaurant= await orderRepository.find()
		const restaurantOrders = await orderRepository.find();
		return restaurantOrders;
	}

	const userOrders = await orderRepository.find({relations: {user: true}, where: {user: {id: id}}});

	return userOrders;
};

export {listOrdersService};