import {Router} from 'express';

import { userCreateController } from '../controllers/Users/userCreate.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userSchema } from '../schemas/users/usersSchema';
import { userDeleteController } from '../controllers/Users/userDelete.controller';
import { useListController } from '../controllers/Users/userList.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';

const userRoutes = Router();

userRoutes.post('', schemaValidatedMiddleware(userSchema),userCreateController);
userRoutes.get('', useListController)
userRoutes.delete('/:id', authenticationMiddleware, userDeleteController)

export default userRoutes;