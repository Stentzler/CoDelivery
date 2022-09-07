import AppDataSource from "../../data-source";
import { ProductCategory } from "../../entities/categories.entity";
import { Products } from "../../entities/products.entity";
import { Restaurant } from "../../entities/restaurant.entity";

const productRepository = AppDataSource.getRepository(Products);
const categoryRepository = AppDataSource.getRepository(ProductCategory);
const restaurantRepository = AppDataSource.getRepository(Restaurant);

export { productRepository, categoryRepository, restaurantRepository };
