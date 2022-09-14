import { Request, Response } from 'express';
import { deletePaymentInfoService } from '../../services/paymentInfo/deletePaymentInfo.service';

const deletePaymentInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await deletePaymentInfoService(id);

  return res.status(204).json({ message: 'Payment deleted successfully' });
};

export { deletePaymentInfoController };
