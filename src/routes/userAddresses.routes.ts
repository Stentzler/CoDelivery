import {Router} from 'express';
import {addressCreateController} from '../controllers/userAddresses/addressCreate.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';
import {isUserMiddleware} from '../middlewares/isUser.middlewares';
import {schemaValidatedMiddleware} from '../middlewares/schemaValidated.middleware';
import {addressesSchema} from '../schemas/addresses/addressesSchema';

const userAddressesRoutes = Router();

userAddressesRoutes.post(
	'',
	authenticationMiddleware,
	isUserMiddleware,
	schemaValidatedMiddleware(addressesSchema),
	addressCreateController
);
userAddressesRoutes.get('');
userAddressesRoutes.patch('');
userAddressesRoutes.delete('');

export default userAddressesRoutes;
