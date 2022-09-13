import AppDataSource from '../../data-source';
import {RestaurantCategory} from '../../entities/restaurantCategory.entity';

const listRestaurantCategoryService = async () => {
	const restaurantCategoryRepo = AppDataSource.getRepository(RestaurantCategory);

	const restaurantCatList = await restaurantCategoryRepo.find();

	return restaurantCatList;
};

export {listRestaurantCategoryService};
