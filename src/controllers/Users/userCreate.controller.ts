import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { userCreateService } from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  const {
    full_name,
    username,
    email,
    password,
    isRestaurant,
    address_info,
    payment_info,
  } = req.body;
  const newUser = await userCreateService({
    full_name,
    username,
    email,
    password,
    isRestaurant,
    address_info,
    payment_info,
  });
  return res.status(201).json(instanceToPlain(newUser));
};

export { userCreateController };
