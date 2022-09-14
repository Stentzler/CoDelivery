import AppDataSource from '../../data-source';
import {Order} from '../../entities/order.entity';
import {AppError} from '../../errors/AppError';

const updateOrdersService = async (
	id: string,
	isRestaurant: boolean,
	orderId: string,
	updateOrderStatus: string
) => {
	const orderRepository = AppDataSource.getRepository(Order);

	if (!isRestaurant) {
		throw new AppError('Update restricted for restaurants', 401);
	}

	const order = await orderRepository.findOne({where: {id: orderId}});

	if (!order) {
		throw new AppError('Order not found', 404);
	}

	if (order.restaurant.id !== id) {
		throw new AppError('This order does not belong to this restaurant!!!', 403);
	}

	if (
		updateOrderStatus === 'Order Received' ||
		updateOrderStatus === 'Out for delivery' ||
		updateOrderStatus === 'Delivered'
	) {
		await orderRepository.update(orderId, {status: updateOrderStatus});
	} else {
		throw new AppError(
			'Order status must match one of the following options: Order Received || Out for delivery || Delivered',
			403
		);
	}

	const updatedOrder = await orderRepository.findOne({where: {id: orderId}});

	return updatedOrder;
};

export {updateOrdersService};
