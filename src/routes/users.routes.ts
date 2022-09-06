import {Router} from 'express';
import { userCreateController } from '../controllers/Users/userCreate.controller';

const userRoutes = Router();

userRoutes.post('/users',userCreateController);

export default userRoutes;
