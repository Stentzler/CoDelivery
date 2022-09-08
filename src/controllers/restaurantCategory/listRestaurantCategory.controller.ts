import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { listRestaurantCategoryService } from "../../services/restaurantCategory/listRestaurantCategory.service";

const listRestaurantCategoryController = async (req: Request, res: Response) => {
    const listRestaurant = await listRestaurantCategoryService()

    return res.status(200).json(instanceToPlain(listRestaurant))
}

export {listRestaurantCategoryController}