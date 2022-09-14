import {Request, Response} from 'express';
import {updateOrdersService} from '../../services/orders/updateOrder.service';

const updateOrdersController = async (req: Request, res: Response) => {
	const {id} = req.user;
	const {isRestaurant} = req.user;
	const orderId: string = req.params.id;
	const {updateOrderStatus} = req.body;

	const updatedOrder = await updateOrdersService(id, isRestaurant, orderId, updateOrderStatus);
	return res.status(201).json(updatedOrder);
};

export {updateOrdersController};
