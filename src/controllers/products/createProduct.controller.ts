import { Request, Response } from "express";
import { IProductRequest } from "../../interfaces/product/product.interface";
import { createProductService } from "../../services/product/createProduct.service";
const createProductController = async (
  request: Request,
  response: Response
) => {
  const data: IProductRequest = request.body;
  const createProduct = await createProductService(data);
  return response.status(201).json(createProduct);
};

export { createProductController };
