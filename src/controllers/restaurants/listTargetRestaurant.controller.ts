import { Request, Response } from "express";
import { listTargetRestaurantService } from "../../services/restaurants/listTargetRestaurant.service";

const listTargetRestaurantController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurant = await listTargetRestaurantService(id);

  return res.status(200).json(restaurant);
};

export { listTargetRestaurantController };