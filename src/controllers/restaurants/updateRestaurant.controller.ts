import { Request, Response } from 'express';
import { updateRestaurantService } from '../../services/restaurants/updateRestaurant.service';

const updateRestaurantController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const update = await updateRestaurantService(id, data);

  return res.status(200).json({ message: 'Updated succcessfully' });
};

export { updateRestaurantController };
