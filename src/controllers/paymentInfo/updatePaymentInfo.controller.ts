import { Request, Response } from 'express';
import { updatePaymentInfoService } from '../../services/paymentInfo/updatePaymentInfo.service';

const updatePaymentInfoController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
   
    const update = await updatePaymentInfoService(id, data)

    return res.status(200).json({ message: "Updated succcessfully" });
}
export{updatePaymentInfoController}