import { Router } from 'express';
import { createOrderController } from '../controllers/orders/createOrder.controller';
import { listOrdersController } from '../controllers/orders/listOrders.controller';
import { updateOrdersController } from '../controllers/orders/updateOrder.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { deleteOrderController } from '../controllers/orders/deleteOrder.controller';
import { isUserMiddleware } from '../middlewares/isUser.middlewares';

const orderRoutes = Router();

orderRoutes.get('', authenticationMiddleware, listOrdersController);
orderRoutes.post(
  '',
  authenticationMiddleware,
  isUserMiddleware,
  createOrderController
);
orderRoutes.patch('/:id', authenticationMiddleware, updateOrdersController);
orderRoutes.delete('/:id', authenticationMiddleware, deleteOrderController);

export default orderRoutes;
