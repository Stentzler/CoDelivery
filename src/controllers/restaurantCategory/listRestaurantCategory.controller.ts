import { Request, Response } from "express";
import { listRestaurantCategoryService } from "../../services/restaurantCategory/listRestaurantCategory.service";

const listRestaurantCategoryController = async (req: Request, res: Response) => {
    const listRestaurant = await listRestaurantCategoryService()

    return res.status(200).json(listRestaurant)
}

export {listRestaurantCategoryController}