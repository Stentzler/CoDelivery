import {Request, Response} from 'express';
import {IAddressInfoRequest} from '../../interfaces/addresses';
import {userAddressCreateService} from '../../services/userAddresses/createUserAddress.service';

const addressCreateController = async (req: Request, res: Response) => {
	const addressInfo: IAddressInfoRequest = req.body;
	const userId: string = req.user.id;

	const userNewAddress = await userAddressCreateService(addressInfo, userId);

	return res.status(201).json(userNewAddress);
};

export {addressCreateController};
