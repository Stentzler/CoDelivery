import AppDataSource from '../../data-source';
import {ProductCategory} from '../../entities/categories.entity';
import {Products} from '../../entities/products.entity';
import {AppError} from '../../errors/AppError';

const listProductsFromCategoryService = async (categoryId: string) => {
	const productCategoryRepo = AppDataSource.getRepository(ProductCategory);
	const productRepo = AppDataSource.getRepository(Products);

	const productCatList = await productCategoryRepo.findOne({where: {id: categoryId}});

	if (!productCatList) {
		throw new AppError('Product category not found!', 404);
	}

	const allProducts = await productRepo.find();
	const allProductsFromCategory = allProducts.filter(product => product.category.id === categoryId);

	return allProductsFromCategory;
};

export {listProductsFromCategoryService};
