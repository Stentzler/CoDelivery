import { Router } from 'express';
import { addProductController } from '../controllers/cart/addProduct.controller';
import { deleteCartProductController } from '../controllers/cart/deleteProduct.controller';
import { listCartProductsController } from '../controllers/cart/listCartProducts.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { isUserMiddleware } from '../middlewares/isUser.middlewares';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { addProductSchema } from '../schemas/cart/cartSchema';

const cartRoutes = Router();

cartRoutes.get(
  '',
  authenticationMiddleware,
  isUserMiddleware,
  listCartProductsController
);

cartRoutes.post(
  '',
  authenticationMiddleware,
  isUserMiddleware,
  schemaValidatedMiddleware(addProductSchema),
  addProductController
);

cartRoutes.delete(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  deleteCartProductController
);

export default cartRoutes;
