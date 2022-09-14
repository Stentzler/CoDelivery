import { Router } from 'express';

import { userEditController } from '../controllers/users/userEdit.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { userCreateController } from '../controllers/users/userCreate.controller';
import { userSoftDeleteController } from '../controllers/users/userSoftDelete.controller';
import { userListController } from '../controllers/users/userList.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userSchema } from '../schemas/users/usersSchema';
import { idVerifierMiddleware } from '../middlewares/idVerifier.middleware';
import { userDeleteController } from '../controllers/users/userDelete.controller';
import { isUserMiddleware } from '../middlewares/isUser.middlewares';

const userRoutes = Router();

userRoutes.post(
  '',
  schemaValidatedMiddleware(userSchema),
  userCreateController
);
userRoutes.patch(
  '/delete/deactivate',
  authenticationMiddleware,
  isUserMiddleware,
  userSoftDeleteController
);

userRoutes.patch(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  userEditController
);

userRoutes.get(
  '/profile',
  authenticationMiddleware,
  isUserMiddleware,
  userListController
);

userRoutes.delete(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  userDeleteController
);

export default userRoutes;
