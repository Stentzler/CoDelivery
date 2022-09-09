import { Request, Response } from "express";
import { restaurantLoginService } from "../../services/session/restaurantLogin.service";

const restaurantLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loggedRestaurant = await restaurantLoginService({ email, password });
  return res.status(200).json(loggedRestaurant);
};

export { restaurantLoginController };
