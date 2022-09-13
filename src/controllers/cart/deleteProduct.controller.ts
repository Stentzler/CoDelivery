import { Request, Response } from 'express';
import { deleteCartProductService } from '../../services/cart/deleteProduct.service';

const deleteCartProductController = async (req: Request, res: Response) => {
  const productId: string = req.params.id;

  const userId: string = req.user.id;

  const removeProduct = await deleteCartProductService(userId, productId);

  return res.sendStatus(204);
};

export { deleteCartProductController };
