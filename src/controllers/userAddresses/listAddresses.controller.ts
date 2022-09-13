import {Request, Response} from 'express';
import {listUserAddressService} from '../../services/userAddresses/listUserAddresses.service';

const listAddressesController = async (req: Request, res: Response) => {
	const userId = req.user.id;

	const userAddresses = await listUserAddressService(userId);

	return res.status(200).json(userAddresses);
};

export {listAddressesController};
