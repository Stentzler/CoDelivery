import { Request, Response } from "express";
import { deleteRestaurantService } from "../../services/restaurants/deleteRestaurant.service";

const deleteRestaurantController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteRestaurantService(id);

  return res.status(204).json({ message: "Deleted successfully" });
};

export { deleteRestaurantController };
