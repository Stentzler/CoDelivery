import { Request, Response } from 'express';
import { IUserAddressUpdateRequest } from '../../interfaces/addresses';
import { updateUserAddressService } from '../../services/userAddresses/updateUserAddress.service';

const updateAddressesController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const addressId: string = req.params.id;
  const newAddressInfo: IUserAddressUpdateRequest = req.body;

  const updatedUserAddress = await updateUserAddressService(
    userId,
    addressId,
    newAddressInfo
  );

  return res.status(201).json(updatedUserAddress);
};

export { updateAddressesController };
