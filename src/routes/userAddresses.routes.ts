import {Router} from 'express';
import {addressCreateController} from '../controllers/userAddresses/addressCreate.controller';
import {deleteAddressController} from '../controllers/userAddresses/deleteAddress.controler';
import {listAddressesController} from '../controllers/userAddresses/listAddresses.controller';
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
userAddressesRoutes.get('', authenticationMiddleware, isUserMiddleware, listAddressesController);
userAddressesRoutes.patch('');
userAddressesRoutes.delete(
	'/:id',
	authenticationMiddleware,
	isUserMiddleware,
	deleteAddressController
);

export default userAddressesRoutes;
