import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { createRestaurantService } from '../../services/restaurants/createRestaurant.service';

const createRestaurantController = async (req: Request, res: Response) => {
  const {
    name,
    description,
    email,
    password,
    cnpj,
    phoneNumber,
    img_url,
    category,
    restaurantAddress,
  } = req.body;
  const restaurant = await createRestaurantService({
    name,
    description,
    email,
    password,
    cnpj,
    phoneNumber,
    img_url,
    category,
    restaurantAddress,
  });

  return res.status(201).json(instanceToPlain(restaurant));
};

export { createRestaurantController };
