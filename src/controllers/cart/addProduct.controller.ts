import {Request, Response} from 'express';
import {addProductService} from '../../services/cart/addProducts.service';

const addProductController = async (req: Request, res: Response) => {
	const productId: string = req.body.id;

	const userId: string = req.user.id;

	const addedProduct = await addProductService(productId, userId);

	return res.status(200).json(addedProduct);
};

export {addProductController};
