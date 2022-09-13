import {Router} from 'express';
import {listProductCategoryController} from '../controllers/productCategory/listProductCategory.controller';
import {listProductsFromCategoryController} from '../controllers/productCategory/listProductsFromCategory.controller';

const productsCategoryRoutes = Router();

productsCategoryRoutes.get('', listProductCategoryController);

productsCategoryRoutes.get('/:id_category/products', listProductsFromCategoryController);

export {productsCategoryRoutes};
