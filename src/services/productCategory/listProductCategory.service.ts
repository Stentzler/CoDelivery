import AppDataSource from "../../data-source";
import { ProductCategory } from "../../entities/categories.entity";

const listProductCategoryService = async () => {
    const productCategoryRepo = AppDataSource.getRepository(ProductCategory)

    const productCatList = await productCategoryRepo.find()
    
    return productCatList
}

export {listProductCategoryService}