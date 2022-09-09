import { Request, Response } from 'express';
import { deleteProductService } from '../../services/product/deleteProduct.service';

const deleteProductController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const restarauntId: string = req.user.id;

  const deletedProduct = await deleteProductService(id, restarauntId);

  return res.status(204).json({ message: 'Product deleted successfully' });
};

export { deleteProductController };
