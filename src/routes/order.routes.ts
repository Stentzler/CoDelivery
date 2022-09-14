import { Router } from "express";
import { createOrderController } from "../controllers/orders/createOrder.controller";
import { deleteOrderController } from "../controllers/orders/deleteOrder.controller";
import { listOrdersController } from "../controllers/orders/listOrders.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";



const orderRoutes = Router()

orderRoutes.post('', authenticationMiddleware, createOrderController)
orderRoutes.get('', authenticationMiddleware, listOrdersController);
orderRoutes.delete('/:id',authenticationMiddleware,deleteOrderController)


export default orderRoutes;