import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import {appRoutes} from './routes';
import {handleErrorMiddleware} from './middlewares/handleError.middleware';

const app = express();

app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
