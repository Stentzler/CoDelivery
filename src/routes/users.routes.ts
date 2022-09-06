import {Router} from 'express';

import { userCreateController } from '../controllers/users/userCreate.controller';
import { userDeleteController } from '../controllers/users/userDelete.controller';
import { userEditController } from '../controllers/users/userEdit.controller';
import { useListController } from '../controllers/users/userList.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userSchema } from '../schemas/users/usersSchema';


const userRoutes = Router();

userRoutes.post('', schemaValidatedMiddleware(userSchema),userCreateController);
userRoutes.patch("/:id", userEditController);
userRoutes.get('', useListController)
userRoutes.delete('/:id', userDeleteController)

export default userRoutes;