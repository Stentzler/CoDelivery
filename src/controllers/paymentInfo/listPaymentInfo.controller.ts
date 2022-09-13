import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { listPaymentInfoService } from '../../services/paymentInfo/listPaymentInfo.service';

const listPaymentInfoController = async (req: Request, res: Response) => {
    const {id}=req.params
   const user= await  listPaymentInfoService(id)
   return res.status(200).json(instanceToPlain(user))
}
export{listPaymentInfoController}