import {Router} from 'express';
import {userEditController} from '../controllers/users/userEdit.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';
import {userCreateController} from '../controllers/users/userCreate.controller';
import {userDeleteController} from '../controllers/users/userDelete.controller';
import {userListController} from '../controllers/users/userList.controller';
import {schemaValidatedMiddleware} from '../middlewares/schemaValidated.middleware';
import {userSchema} from '../schemas/users/usersSchema';
import {idVerifierMiddleware} from '../middlewares/idVerifier.middleware';

const userRoutes = Router();

userRoutes.post('', schemaValidatedMiddleware(userSchema), userCreateController);
userRoutes.patch('/:id', authenticationMiddleware, idVerifierMiddleware, userEditController);
userRoutes.get('', userListController);
userRoutes.delete('/:id', authenticationMiddleware, userDeleteController);

export default userRoutes;
