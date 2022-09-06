import {Router} from 'express';
import { userLoginController } from '../controllers/session/userLogin.controller';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { userLoginSchema } from '../schemas/session/userLoginSchema';


const sessionRoutes = Router();

sessionRoutes.post('',schemaValidatedMiddleware(userLoginSchema),userLoginController);

export default sessionRoutes;
