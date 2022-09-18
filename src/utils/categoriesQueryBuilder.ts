import AppDataSource from '../data-source';
import { ProductCategory } from '../entities/categories.entity';
import { RestaurantCategory } from '../entities/restaurantCategory.entity';

const categoriesQueryBuilder = async () => {
  const dataExists = await AppDataSource.getRepository(RestaurantCategory)
    .createQueryBuilder('category')
    .where('category.name = :name', { name: 'Bakery' })
    .getOne();

  if (dataExists?.name === 'Bakery') {
    return true;
  } else {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ProductCategory)
      .execute();

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(RestaurantCategory)
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(ProductCategory)
      .values([
        { name: 'Drinks' },
        { name: 'Pizzas' },
        { name: 'Hamburgers' },
        { name: 'Sushis' },
        { name: 'Pasta' },
        { name: 'Ice Cream' },
        { name: 'Vegan' },
        { name: 'Vegetarian' },
        { name: 'Fit' },
      ])
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(RestaurantCategory)
      .values([
        { name: 'Fast Food' },
        { name: 'Bakery' },
        { name: 'Pizzeria' },
        { name: 'Barbecue' },
        { name: 'Japanese' },
        { name: 'Mediterranean' },
        { name: 'Arabian' },
        { name: 'Korean' },
        { name: 'Mexican' },
        { name: 'Thai' },
      ])
      .execute();
  }
};
export { categoriesQueryBuilder };
