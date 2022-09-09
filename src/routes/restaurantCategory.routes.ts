import { Router } from "express";

import { listRestaurantCategoryController } from "../controllers/restaurantCategory/listRestaurantCategory.controller";
import { listRestaurantFromCategoryController } from "../controllers/restaurantCategory/listRestaurantFromCategory.controller";

const restaurantCategory = Router();

restaurantCategory.get(
  "/restaurant_categories",
  listRestaurantCategoryController
);

restaurantCategory.get(
  "/restaurant_categories/:id/products",
  listRestaurantFromCategoryController
);
