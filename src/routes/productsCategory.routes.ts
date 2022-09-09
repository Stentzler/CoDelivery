import {Router} from 'express';
import {listProductCategoryController} from '../controllers/productCategory/listProductCategory.controller';
import {listProductsFromCategoryController} from '../controllers/productCategory/listProductsFromCategory.controller';

const productsCategory = Router();

productsCategory.get('/products_categories', listProductCategoryController);

productsCategory.get(
	'/products_categories/:id_category/products',
	listProductsFromCategoryController
);
