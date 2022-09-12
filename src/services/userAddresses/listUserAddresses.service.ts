import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {AppError} from '../../errors/AppError';

const listUserAddressService = async (userId: string) => {
	const usersRepository = AppDataSource.getRepository(Users);
	const user = await usersRepository.findOneBy({id: userId});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	const addresses = user.address;

	return addresses;
};

export {listUserAddressService};
