import { Router } from "express";
import { createRestaurantController } from "../controllers/restaurants/createRestaurant.controller";
import { deleteRestaurantController } from "../controllers/restaurants/deleteRestaurant.controller";
import { listRestaurantController } from "../controllers/restaurants/listRestaurant.controller";
import { listTargetRestaurantController } from "../controllers/restaurants/listTargetRestaurant.controller";
import { updateRestaurantController } from "../controllers/restaurants/updateRestaurant.controller";
import { uploadImageRestaurantController } from "../controllers/restaurants/uploadImageRestaurant.controller";

import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { idVerifierMiddleware } from "../middlewares/idVerifier.middleware";
import { upload } from "../middlewares/multer.middleware";
import { schemaValidatedMiddleware } from "../middlewares/schemaValidated.middleware";
import { restaurantSchema } from "../schemas/restaurants/restaurants.schemas";

const restaurantRoutes = Router();

restaurantRoutes.post(
  "",
  schemaValidatedMiddleware(restaurantSchema),
  createRestaurantController
  );
  
  restaurantRoutes.post("/uploadImage/:id",authenticationMiddleware,idVerifierMiddleware,upload.single('image'),uploadImageRestaurantController)

restaurantRoutes.get("", listRestaurantController);

restaurantRoutes.get(
  "/profile",
  authenticationMiddleware,
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
