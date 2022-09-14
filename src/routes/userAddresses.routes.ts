import { Router } from 'express';
import { addressCreateController } from '../controllers/userAddresses/addressCreate.controller';
import { deleteAddressController } from '../controllers/userAddresses/deleteAddress.controler';
import { listAddressesController } from '../controllers/userAddresses/listAddresses.controller';
import { updateAddressesController } from '../controllers/userAddresses/updateAddress.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { idVerifierMiddleware } from '../middlewares/idVerifier.middleware';
import { isUserMiddleware } from '../middlewares/isUser.middlewares';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import {
  addressesSchema,
  updateUseraddressesSchema,
} from '../schemas/addresses/addressesSchema';

const userAddressesRoutes = Router();

userAddressesRoutes.post(
  '',
  authenticationMiddleware,
  isUserMiddleware,
  schemaValidatedMiddleware(addressesSchema),
  addressCreateController
);

userAddressesRoutes.get(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  listAddressesController
);

userAddressesRoutes.patch(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  schemaValidatedMiddleware(updateUseraddressesSchema),
  updateAddressesController
);

userAddressesRoutes.delete(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  deleteAddressController
);

export default userAddressesRoutes;
