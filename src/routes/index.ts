import {Express} from 'express';
import userRoutes from './users.routes';

export const appRoutes = (app: Express) => {
	app.use('/users', userRoutes);
};
