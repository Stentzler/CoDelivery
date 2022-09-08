/*import AppDataSource from "../../data-source";
import { ProductCategory } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

const listTargetProductCategoryService = async (id: string) => {
    const productCategoryRepo = AppDataSource.getRepository(ProductCategory)

    const productCatList = await productCategoryRepo.findOne({where: {id}})

    if (!productCatList){
        throw new AppError("Product category not found!", 404)
    }

    return productCatList
}

export {listTargetProductCategoryService}*/