import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IProductRequest } from '../../interfaces/product/product.interface';
import { createProductService } from '../../services/product/createProduct.service';
const createProductController = async (req: Request, res: Response) => {
  const data: IProductRequest = req.body;
  const restarauntId: string = req.user.id;
  const createProduct = await createProductService(data, restarauntId);

  return res.status(201).json(instanceToPlain(createProduct));
};

export { createProductController };
