import { Router } from "express";

import { listRestaurantCategoryController } from "../controllers/restaurantCategory/listRestaurantCategory.controller";

const restaurantCategory = Router()

restaurantCategory.get("/restaurant_categories", listRestaurantCategoryController)

restaurantCategory.get("",)