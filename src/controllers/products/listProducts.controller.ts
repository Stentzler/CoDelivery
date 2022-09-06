import { Request, Response } from "express";
import { listProductsService } from "../../services/product/listProducts.service";

const listProductsController = async (request: Request, response: Response) => {
  const listProducts = await listProductsService();
  return response.status(200).json(listProducts);
};

export { listProductsController };
