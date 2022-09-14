import {Router} from 'express';
import {createOrderController} from '../controllers/orders/createOrder.controller';
import {listOrdersController} from '../controllers/orders/listOrder.controller';
import {updateOrdersController} from '../controllers/orders/updateOrder.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';
import { deleteOrderController } from "../controllers/orders/deleteOrder.controller";

const orderRoutes = Router();

orderRoutes.get('', authenticationMiddleware, listOrdersController);
orderRoutes.post('', authenticationMiddleware, createOrderController);
orderRoutes.patch('/:id', authenticationMiddleware, updateOrdersController);
orderRoutes.delete('/:id',authenticationMiddleware,deleteOrderController)

export default orderRoutes;
