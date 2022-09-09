import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listProductsService } from '../../services/product/listProducts.service';

const listProductsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const listProducts = await listProductsService(id);
  return res.status(200).json(instanceToPlain(listProducts));
};

export { listProductsController };
