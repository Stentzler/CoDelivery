import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createRestaurantService } from "../../services/restaurants/createRestaurant.service";

const createRestaurantController = async (req: Request, res: Response) => {
  const {
    name,
    description,
    isRestaurant,
    email,
    password,
    cnpj,
    category,
    restaurant_address,
  } = req.body;
  console.log(req.body)
console.log(req.file)
  const restaurant = await createRestaurantService({
    name,
    description,
    isRestaurant,
    email,
    password,
    cnpj,
    category,
    restaurant_address,
  });

  return res.status(201).json(instanceToPlain(restaurant));
};

export { createRestaurantController };
