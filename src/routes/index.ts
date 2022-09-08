import { Express } from 'express';
import productsRoutes from './products.routes';
import restaurantRoutes from './restaurants.routes';
import sessionRoutes from './session.routes';

import userRoutes from './users.routes';

export const appRoutes = (app: Express) => {
  app.use('/users', userRoutes);
  app.use('/login', sessionRoutes);
  app.use('/products', productsRoutes);
  app.use('/restaurants', restaurantRoutes);
};
