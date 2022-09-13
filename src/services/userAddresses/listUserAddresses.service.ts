import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {AppError} from '../../errors/AppError';

const listUserAddressService = async (userId: string) => {
	const usersRepository = AppDataSource.getRepository(Users);
	const user = await usersRepository.findOne({where: {id: userId}, relations: {address: true}});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	return {address: user.address};
};

export {listUserAddressService};
