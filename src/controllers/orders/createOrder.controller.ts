import { Request, Response } from 'express';
import { createOrderService } from '../../services/orders/createOrder.service';

const createOrderController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const order = await createOrderService(id);
  return res.status(201).json(order);
};

export { createOrderController };
