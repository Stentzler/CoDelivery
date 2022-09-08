import { Router } from "express";

import { userEditController } from "../controllers/users/userEdit.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userCreateController } from "../controllers/users/userCreate.controller";
import { userSoftDeleteController } from "../controllers/users/userSoftDelete.controller";
import { userListController } from "../controllers/users/userList.controller";
import { schemaValidatedMiddleware } from "../middlewares/schemaValidated.middleware";
import { userSchema } from "../schemas/users/usersSchema";
import { idVerifierMiddleware } from "../middlewares/idVerifier.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  schemaValidatedMiddleware(userSchema),
  userCreateController
);
userRoutes.patch(
  "/delete/inactivate",
  authenticationMiddleware,
  userSoftDeleteController
);
userRoutes.patch(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  userEditController
);
userRoutes.get(
  "/profile",
  authenticationMiddleware,
  userListController
);

export default userRoutes;
