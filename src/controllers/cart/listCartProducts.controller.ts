import { Request, Response } from 'express';
import { listCartProductsService } from '../../services/cart/listCartProducts.service';

const listCartProductsController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;

  const cartProducts = await listCartProductsService(userId);

  return res.status(200).json(cartProducts);
};

export { listCartProductsController };
