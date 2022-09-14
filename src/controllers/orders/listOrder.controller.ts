import {Request, Response} from 'express';
import {listOrdersService} from '../../services/orders/listOrders.service';

const listOrdersController = async (req: Request, res: Response) => {
	const {id} = req.user;
	const {isRestaurant} = req.user;
	const orders = await listOrdersService(id, isRestaurant);
	return res.status(201).json(orders);
};

export {listOrdersController};
