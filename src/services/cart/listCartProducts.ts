import AppDataSource from '../../data-source';
import {Cart} from '../../entities/cart.entity';
import {Users} from '../../entities/user.entity';
import {AppError} from '../../errors/AppError';

const listCartProductsService = async (userId: string) => {
	const userRepository = AppDataSource.getRepository(Users);
	const cartRepository = AppDataSource.getRepository(Cart);

	const user = await userRepository.findOne({where: {id: userId}});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	const cart = await cartRepository.findOne({where: {id: user.cart.id}});

	if (!cart) {
		throw new AppError('Cart not found', 404);
	}

	return cart;
};

export {listCartProductsService};
