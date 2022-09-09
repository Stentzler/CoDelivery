import {Router} from 'express';
import {addProductController} from '../controllers/cart/addProduct.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';
import {idVerifierMiddleware} from '../middlewares/idVerifier.middleware';
import {schemaValidatedMiddleware} from '../middlewares/schemaValidated.middleware';
import {addProductSchema} from '../schemas/cart/cartSchema';

const cartRoutes = Router();

cartRoutes.post(
	'',
	authenticationMiddleware,
	idVerifierMiddleware,
	schemaValidatedMiddleware(addProductSchema),
	addProductController
);

cartRoutes.delete('/:id');

export default cartRoutes;
