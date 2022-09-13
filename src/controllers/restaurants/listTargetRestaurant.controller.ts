import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listTargetRestaurantService } from '../../services/restaurants/listTargetRestaurant.service';

const listTargetRestaurantController = async (req: Request, res: Response) => {
  const id = req.user.id;

  const restaurant = await listTargetRestaurantService(id);

  return res.status(200).json(instanceToPlain(restaurant));
};

export { listTargetRestaurantController };
