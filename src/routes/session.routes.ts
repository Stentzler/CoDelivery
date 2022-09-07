import { Router } from "express";
import { restaurantLoginController } from "../controllers/session/restaurantLogin.controller";
import { userLoginController } from "../controllers/session/userLogin.controller";
import { schemaValidatedMiddleware } from "../middlewares/schemaValidated.middleware";
import { sessionLoginSchema } from "../schemas/session/sessionLoginSchema";

const sessionRoutes = Router();

sessionRoutes.post(
  "/users",
  schemaValidatedMiddleware(sessionLoginSchema),
  userLoginController
);
sessionRoutes.post(
  "/restaurants",
  schemaValidatedMiddleware(sessionLoginSchema),
  restaurantLoginController
);
export default sessionRoutes;
