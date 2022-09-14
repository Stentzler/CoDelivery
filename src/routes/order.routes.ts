import {Router} from 'express';
import {createOrderController} from '../controllers/orders/createOrder.controller';
import {listOrdersController} from '../controllers/orders/listOrder.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';

const orderRoutes = Router();

orderRoutes.get('', authenticationMiddleware, listOrdersController);
orderRoutes.post('', authenticationMiddleware, createOrderController);

export default orderRoutes;
