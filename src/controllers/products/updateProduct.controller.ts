import { Request, Response } from "express";
import { IProductRequest } from "../../interfaces/product/product.interface";
import { updateProductService } from "../../services/product/updateProduct.service";

const updateProductController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.body.id;
  const data: IProductRequest = request.body;
  const updatedProduct = await updateProductService(id, data);
  return response.status(200).json(updatedProduct);
};

export { updateProductController };
