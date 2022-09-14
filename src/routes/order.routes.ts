import { Router } from "express";
import { createOrderController } from "../controllers/orders/createOrder.controller";
import { deleteOrderController } from "../controllers/orders/deleteOrder.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { idVerifierMiddleware } from "../middlewares/idVerifier.middleware";


const orderRoutes = Router()

orderRoutes.post('', authenticationMiddleware, createOrderController)
orderRoutes.delete('/:id',authenticationMiddleware,deleteOrderController)


export default orderRoutes;