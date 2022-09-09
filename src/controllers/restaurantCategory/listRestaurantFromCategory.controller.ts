import { listRestaurantFromCategoryService } from "../../services/restaurantCategory/listRestaurantFromCategory.service";
import { Request, Response } from "express";

const listRestaurantFromCategoryController = async (
  req: Request,
  res: Response
) => {
  const restaurantId: string = req.params.id;

  const listRes = await listRestaurantFromCategoryService(restaurantId);

  return res.status(200).json(listRes);
};

export { listRestaurantFromCategoryController };
