import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";

const productRepository = AppDataSource.getRepository(Product);
export { productRepository };
