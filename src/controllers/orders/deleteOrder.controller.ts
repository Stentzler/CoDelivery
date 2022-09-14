import { Request, Response } from "express";
import { deleteOrderService } from "../../services/orders/deleteOrder.service";

const deleteOrderController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const {isRestaurant}=req.user
  const{id}=req.params

  const deletedOrder = await deleteOrderService(userId,id,isRestaurant);

  return res.status(200).json({ message: 'Order deleted successfully' });
};

export { deleteOrderController };
