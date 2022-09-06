import {Router} from 'express';
import { userLoginController } from '../controllers/session/userLogin.controller';


const sessionRoutes = Router();

sessionRoutes.post('',userLoginController);

export default sessionRoutes;
