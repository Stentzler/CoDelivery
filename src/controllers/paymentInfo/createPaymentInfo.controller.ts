import { Request, Response } from "express";
import { createPaymentInfoService } from "../../services/paymentInfo/createPaymentInfo.service";

const createPaymentInfoController = async (req: Request, res: Response) => {
  const { userId, name, cardNo, cvvNo, expireDate, cpf } = req.body;
  const newPayment =await  createPaymentInfoService({
    userId,
    name,
    cardNo,
    cvvNo,
    expireDate,
    cpf,
  });
  return res
    .status(201)
    .json({ message: 'Payment method registered successfully' });
};

export { createPaymentInfoController };
