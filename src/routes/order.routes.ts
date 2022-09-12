import { Router } from "express";
import { createOrderController } from "../controllers/orders/createOrder.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";


const orderRoutes = Router()

orderRoutes.post('', authenticationMiddleware, createOrderController)


export default orderRoutes;