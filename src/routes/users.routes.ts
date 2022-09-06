import {Router} from 'express';
import { userDeleteController } from '../controllers/user/userDelete.controller';
import { useListController } from '../controllers/user/userList.controller';

const userRoutes = Router();

userRoutes.post('');
userRoutes.get('/users', useListController)
userRoutes.patch('/users/:id', userDeleteController)

export default userRoutes;
