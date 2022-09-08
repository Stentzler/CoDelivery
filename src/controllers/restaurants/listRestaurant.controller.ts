import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listRestaurantService } from '../../services/restaurants/listRestaurant.service';

const listRestaurantController = async (req: Request, res: Response) => {
  const restaurants = await listRestaurantService();

  return res.status(200).json(instanceToPlain(restaurants));
};

export { listRestaurantController };
