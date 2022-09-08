/*import { listTargetProductCategoryService } from "../../services/productCategory/listTargetProductCategory.service";
import { Request, Response } from "express";

const listTargetProductCategoryController = async (req: Request, res: Response) => {
    const {id_category} = req.params

    const listProduct = await listTargetProductCategoryService(id_category)

    return res.status(200).json(listProduct)
}

export {listTargetProductCategoryController}*/