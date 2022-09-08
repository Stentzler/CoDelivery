import { Request, Response } from 'express';
import { IProductRequest } from '../../interfaces/product/product.interface';
import { createProductService } from '../../services/product/createProduct.service';
const createProductController = async (req: Request, res: Response) => {
  const data: IProductRequest = req.body;

  const createProduct = await createProductService(data);

  return res.status(201).json(createProduct);
};

export { createProductController };
