import { Router } from "express";

import { userEditController } from "../controllers/Users/userEdit.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userCreateController } from "../controllers/Users/userCreate.controller";
import { userDeleteController } from "../controllers/Users/userDelete.controller";
import { userListController } from "../controllers/Users/userList.controller";
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
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  userEditController
);
userRoutes.get(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  userListController
);
userRoutes.delete(
  "/:id",
  authenticationMiddleware,
  idVerifierMiddleware,
  userDeleteController
);

export default userRoutes;
