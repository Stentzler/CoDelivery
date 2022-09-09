import {Request, Response} from 'express';
import {AppError} from '../../errors/AppError';
import {deleteProductService} from '../../services/product/deleteProduct.service';

const deleteProductController = async (req: Request, res: Response) => {
	const productId: string = req.params.id;

	const userId: string = req.user.id;

	const removeProduct = deleteProductService(userId, productId);

	return res.sendStatus(204);
};

export {deleteProductController};
