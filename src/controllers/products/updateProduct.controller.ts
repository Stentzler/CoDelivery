import { Request, Response } from 'express';
import { IProductRequest } from '../../interfaces/product/product.interface';
import { restaurantRepository } from '../../services/product/repositories';
import { updateProductService } from '../../services/product/updateProduct.service';

const updateProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const restaurantId: string = req.user.id;

  const data: IProductRequest = req.body;

  const updatedProduct = await updateProductService(id, restaurantId, data);

  return res.status(200).json(updatedProduct);
};

export { updateProductController };
