import {getRepository} from 'typeorm';
import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {UserAddress} from '../../entities/userAddresses.entity';
import {AppError} from '../../errors/AppError';
import {IAddressInfoRequest} from '../../interfaces/addresses';

const userAddressCreateService = async (addressInfo: IAddressInfoRequest, userId: string) => {
	const usersRepository = AppDataSource.getRepository(Users);
	const userAddressRepository = AppDataSource.getRepository(UserAddress);

	const user = await usersRepository.findOneBy({id: userId});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	const newUserAddress = new UserAddress();

	newUserAddress.street = addressInfo.street;
	newUserAddress.number = addressInfo.number;
	newUserAddress.zipCode = addressInfo.zipCode;
	newUserAddress.city = addressInfo.city;
	newUserAddress.state = addressInfo.state;
	newUserAddress.complement = addressInfo.complement ? addressInfo.complement : '';
	newUserAddress.user = user;

	userAddressRepository.create(newUserAddress);
	await userAddressRepository.save(newUserAddress);

	const updatedUser = await usersRepository.findOne({
		where: {id: userId},
		relations: {address: true},
	});

	const dataToReturn = {
		userName: user.userName,
		email: user.email,
		address: updatedUser!.address,
	};

	return dataToReturn;
};

export {userAddressCreateService};
