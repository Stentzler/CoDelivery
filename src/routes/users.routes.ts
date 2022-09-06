import {Router} from 'express';

import { userCreateController } from '../controllers/users/userCreate.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userSchema } from '../schemas/users/usersSchema';
import { userDeleteController } from '../controllers/user/userDelete.controller';
import { useListController } from '../controllers/user/userList.controller';

const userRoutes = Router();

userRoutes.post('', schemaValidatedMiddleware(userSchema),userCreateController);
userRoutes.get('', useListController)
userRoutes.delete('/:id', userDeleteController)

export default userRoutes;