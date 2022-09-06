import {Router} from 'express';
import { userCreateController } from '../controllers/users/userCreate.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userSchema } from '../schemas/users/usersSchema';

const userRoutes = Router();

userRoutes.post('', schemaValidatedMiddleware(userSchema),userCreateController);

export default userRoutes;
