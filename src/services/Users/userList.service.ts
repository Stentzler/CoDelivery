import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {AppError} from '../../errors/AppError';

const userListService = async (id: string): Promise<Users> => {
	const userRepository = AppDataSource.getRepository(Users);

	// const user = await userRepository.find({where: {id}})
	const user = await userRepository
		.createQueryBuilder('users')
		.leftJoinAndSelect('users.address', 'address')
		.leftJoinAndSelect('users.paymentInfo', 'paymentInfo')
		.where('users.id = :id', {id})
		.getOne();

	if (!user) {
		throw new AppError('User not found', 404);
	}

	return user!;
};

export {userListService};
