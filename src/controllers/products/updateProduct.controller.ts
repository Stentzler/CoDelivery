import { Request, Response } from "express";
import { IProductRequest } from "../../interfaces/product/product.interface";
import { updateProductService } from "../../services/product/updateProduct.service";

const updateProductController = async (req: Request, res: Response) => {
  const isRestaurant: any = req.user;
  const id: string = req.body.id;
  const data: IProductRequest = req.body;
  const updatedProduct = await updateProductService(id, isRestaurant, data);
  return res.status(200).json(updatedProduct);
};

export { updateProductController };
