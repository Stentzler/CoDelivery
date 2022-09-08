import { Router } from 'express';
import { createProductController } from '../controllers/products/createProduct.controller';
import { deleteProductController } from '../controllers/products/deleteProduct.controller';
import { listProductsController } from '../controllers/products/listProducts.controller';
import { updateProductController } from '../controllers/products/updateProduct.controller';

const productsRoutes = Router();

//Listar todos os produtos -
productsRoutes.get('', listProductsController);

productsRoutes.get('/:id', listProductsController);

//Cadastrar produto
productsRoutes.post('', createProductController);

//Atualizar produto
productsRoutes.patch('/:id', updateProductController);

//deletar produto
productsRoutes.delete('/:id', deleteProductController);

export default productsRoutes;
