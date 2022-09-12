import {Express} from 'express';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import productsRoutes from './products.routes';
import {productsCategoryRoutes} from './productsCategory.routes';
import {restaurantCategoriesRoutes} from './restaurantCategory.routes';
import restaurantRoutes from './restaurants.routes';
import sessionRoutes from './session.routes';
import userAddressesRoutes from './userAddresses.routes';

import userRoutes from './users.routes';

export const appRoutes = (app: Express) => {
	app.use('/users', userRoutes);
	app.use('/login', sessionRoutes);
	app.use('/products', productsRoutes);
	app.use('/restaurants', restaurantRoutes);
	app.use('/cart', cartRoutes);
	app.use('/products_categories', productsCategoryRoutes);
	app.use('/restaurant_categories', restaurantCategoriesRoutes);
	app.use('/order', orderRoutes)
	app.use('/users/addresses', userAddressesRoutes);
};
