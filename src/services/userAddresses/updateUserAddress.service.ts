import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {UserAddress} from '../../entities/userAddresses.entity';
import {AppError} from '../../errors/AppError';
import {IAddressUpdateRequest} from '../../interfaces/addresses';

const updateUserAddressService = async (
	userId: string,
	addressId: string,
	newAddressInfo: IAddressUpdateRequest
) => {
	const userRepository = AppDataSource.getRepository(Users);
	const userAddressRepository = AppDataSource.getRepository(UserAddress);

	const user = await userRepository.findOneBy({id: userId});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	const address = await userAddressRepository.findOneBy({id: addressId});

	if (!address) {
		throw new AppError('Address is not registered', 404);
	}

	const addressBelongsToUser = user.address.find(address => address.id === addressId);

	if (!addressBelongsToUser) {
		throw new AppError('Address does not belong to this user', 401);
	}

	const newAddress = {...address, ...newAddressInfo};

	const updatedAddress = await userAddressRepository.update(addressId, newAddress);

	user.updatedAt = new Date();

	return updatedAddress;
};

export {updateUserAddressService};