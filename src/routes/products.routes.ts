import {Router} from 'express';
import {createProductController} from '../controllers/products/createProduct.controller';
import {deleteProductController} from '../controllers/products/deleteProduct.controller';
import {listProductsController} from '../controllers/products/listProducts.controller';
import {updateProductController} from '../controllers/products/updateProduct.controller';
import {authenticationMiddleware} from '../middlewares/authentication.middleware';
import {isRestaurantMiddleware} from '../middlewares/isRestaurant.middlewares';
import {upload} from '../middlewares/multer.middleware';
import {uploadImageProductController} from '../controllers/products/uploadImageProduct.controller';
import {schemaValidatedMiddleware} from '../middlewares/schemaValidated.middleware';
import {productSchema} from '../schemas/product/productSchema';

const productsRoutes = Router();

//Listar todos os produtos -
productsRoutes.get('', listProductsController);

productsRoutes.get('/:id', listProductsController);

//Cadastrar produto
productsRoutes.post(
	'',
	authenticationMiddleware,
	isRestaurantMiddleware,
	schemaValidatedMiddleware(productSchema),
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
productsRoutes.delete(
	'/:id',
	authenticationMiddleware,
	isRestaurantMiddleware,
	deleteProductController
);

//Upload product image
productsRoutes.post(
	'/upload_image/:id',
	authenticationMiddleware,
	isRestaurantMiddleware,
	upload.single('image'),
	uploadImageProductController
);

export default productsRoutes;
