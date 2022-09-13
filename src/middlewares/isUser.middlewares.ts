import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const isUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const {authorization} = req.headers;

	if (!authorization) return res.status(401).json({message: 'Missing token!'});

	const token = authorization.split(' ')[1];

	const {isRestaurant} = jwt.decode(token) as {isRestaurant: boolean};

	if (isRestaurant) return res.status(403).json({message: 'User token required'});

	next();
};

export {isUserMiddleware};
