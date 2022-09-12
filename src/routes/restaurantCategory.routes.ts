import {Router} from 'express';

import {listRestaurantCategoryController} from '../controllers/restaurantCategory/listRestaurantCategory.controller';
import {listRestaurantFromCategoryController} from '../controllers/restaurantCategory/listRestaurantFromCategory.controller';

const restaurantCategoriesRoutes = Router();

restaurantCategoriesRoutes.get('', listRestaurantCategoryController);

restaurantCategoriesRoutes.get('/:id_category/restaurants', listRestaurantFromCategoryController);

export {restaurantCategoriesRoutes};
