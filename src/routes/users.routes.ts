import { Router } from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userCreateController } from "../controllers/users/userCreate.controller";
import { userDeleteController } from "../controllers/users/userDelete.controller";
import { userListController } from "../controllers/users/userList.controller";
import { schemaValidatedMiddleware } from "../middlewares/schemaValidated.middleware";
import { userSchema } from "../schemas/users/usersSchema";

const userRoutes = Router();

userRoutes.post(
  "",
  schemaValidatedMiddleware(userSchema),
  userCreateController
);
userRoutes.get("", userListController);
userRoutes.delete("/:id", authenticationMiddleware, userDeleteController);

export default userRoutes;
