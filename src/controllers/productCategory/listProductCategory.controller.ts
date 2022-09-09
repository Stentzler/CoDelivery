import {Request, Response} from 'express';
import {listProductCategoryService} from '../../services/productCategory/listProductCategory.service';

const listProductCategoryController = async (req: Request, res: Response) => {
	const listProduct = await listProductCategoryService();

	return res.status(200).json(listProduct);
};

export {listProductCategoryController};
