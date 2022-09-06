import { Router } from "express";
import { createRestaurantController } from "../controllers/restaurants/createRestaurant.controller";
import { deleteRestaurantController } from "../controllers/restaurants/deleteRestaurant.controller";
import { listRestaurantController } from "../controllers/restaurants/listRestaurant.controller";
import { listTargetRestaurantController } from "../controllers/restaurants/listTargetRestaurant.controller";
import { updateRestaurantController } from "../controllers/restaurants/updateRestaurant.controller";
import { restaurantValidationMiddleware } from "../middlewares/restaurantValidation.middleware";
import { restaurantSchema } from "../schemas/restaurants/restaurants.schemas";

const restaurantRoutes = Router();

restaurantRoutes.post(
  "",
  restaurantValidationMiddleware(restaurantSchema),
  createRestaurantController
);

restaurantRoutes.get("", listRestaurantController);

restaurantRoutes.get("/:id", listTargetRestaurantController);

restaurantRoutes.patch("/:id", updateRestaurantController);

restaurantRoutes.delete("/:id", deleteRestaurantController);

export default restaurantRoutes;
