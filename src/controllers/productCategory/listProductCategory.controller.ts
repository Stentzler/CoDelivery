import { Request, Response } from "express";
import { listProductCategoryService } from "../../services/productCategory/listProductCategory.service";
import { instanceToPlain } from "class-transformer";

const listProductCategoryController = async (req: Request, res: Response) => {
    const listProduct = await listProductCategoryService()

    return res.status(200).json(instanceToPlain(listProduct))
}

export {listProductCategoryController}