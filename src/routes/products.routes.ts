import { Router } from 'express';
import { createProductController } from '../controllers/products/createProduct.controller';
import { deleteProductController } from '../controllers/products/deleteProduct.controller';
import { listProductsController } from '../controllers/products/listProducts.controller';
import { updateProductController } from '../controllers/products/updateProduct.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { isRestaurantMiddleware } from '../middlewares/isRestaurant.middlewares';

const productsRoutes = Router();

//Listar todos os produtos -
productsRoutes.get('', listProductsController);

productsRoutes.get('/:id', listProductsController);

//Cadastrar produto
productsRoutes.post(
  '',
  authenticationMiddleware,
  isRestaurantMiddleware,
  createProductController
);

//Atualizar produto
productsRoutes.patch(
  '/:id',
  authenticationMiddleware,
  isRestaurantMiddleware,
  updateProductController
);

//deletar produto
productsRoutes.delete('/:id', deleteProductController);

export default productsRoutes;
