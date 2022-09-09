import {Request, Response} from 'express';
import {listProductsFromCategoryService} from '../../services/productCategory/listProductsFromCategory.service';

const listProductsFromCategoryController = async (req: Request, res: Response) => {
	const categoryId: string = req.params.id_category;

	const listProduct = await listProductsFromCategoryService(categoryId);

	return res.status(200).json(listProduct);
};

export {listProductsFromCategoryController};
