import { Router } from "express";
import { createRestaurantController } from "../controllers/restaurants/createRestaurant.controller";
import { deleteRestaurantController } from "../controllers/restaurants/deleteRestaurant.controller";
import { listRestaurantController } from "../controllers/restaurants/listRestaurant.controller";
import { listTargetRestaurantController } from "../controllers/restaurants/listTargetRestaurant.controller";
import { updateRestaurantController } from "../controllers/restaurants/updateRestaurant.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { idVerifierMiddleware } from "../middlewares/idVerifier";
import { schemaValidatedMiddleware } from "../middlewares/schemaValidated.middleware";
import { restaurantSchema } from "../schemas/restaurants/restaurants.schemas";

const restaurantRoutes = Router();

restaurantRoutes.post(
  "",
  schemaValidatedMiddleware(restaurantSchema),
  createRestaurantController
);

restaurantRoutes.get("", listRestaurantController);

restaurantRoutes.get(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  listTargetRestaurantController
);

restaurantRoutes.patch(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  updateRestaurantController
);

restaurantRoutes.delete(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  deleteRestaurantController
);

export default restaurantRoutes;
