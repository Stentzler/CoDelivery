import {Request, Response} from 'express';
import {deleteUserAddressService} from '../../services/userAddresses/deleteUserAddress.service';

const deleteAddressController = async (req: Request, res: Response) => {
	const userId: string = req.user.id;
	const addressId: string = req.params.id;
	const deleteAddress = await deleteUserAddressService(userId, addressId);

	return res.status(204);
};

export {deleteAddressController};
