import AppDataSource from '../../data-source';
import {Users} from '../../entities/user.entity';
import {Cart} from '../../entities/cart.entity';
import {Order} from '../../entities/order.entity';
import {AppError} from '../../errors/AppError';
import {Products} from '../../entities/products.entity';

const createOrderService = async (id: string) => {
	const userRepository = AppDataSource.getRepository(Users);
	const cartRepository = AppDataSource.getRepository(Cart);
	const orderRepository = AppDataSource.getRepository(Order);
	const productRepository = AppDataSource.getRepository(Products);

	const user = await userRepository.findOne({
		where: {id},
		relations: {paymentInfo: true, cart: true},
		select: {
			id: true,
			fullName: true,
			userName: true,
			email: true,
			isActive: true,
		},
	});

	const toSendUser = await userRepository.findOne({
		where: {id},
		relations: {address: true},
		select: {
			id: true,
			fullName: true,
			userName: true,
			email: true,
			isActive: true,
		},
	});

	if (!user) {
		throw new AppError('User not found', 404);
	}

	if (!user.isActive) {
		throw new AppError('This user is not active', 403);
	}

	if (!user?.paymentInfo) {
		throw new AppError('You need to register a payment method', 404);
	}

	if (
		user.paymentInfo.cpf === '' ||
		user.paymentInfo.expireDate === '' ||
		user.paymentInfo.cvvNo === '' ||
		user.paymentInfo.cardNo === '' ||
		user.paymentInfo.name === ''
	) {
		throw new AppError('You need to register a payment method', 404);
	}

	const cart = await cartRepository.findOne({
		where: {id: user?.cart.id},
	});
	if (!cart) {
		throw new AppError('There is no cart', 400);
	}

	if (cart.products.length === 0) {
		throw new AppError('Cart is empty', 400);
	}

	const productOnCart = await productRepository.findOne({
		where: {id: cart.products[0].id},
		relations: {
			restaurant: {
				address: true,
			},
		},
		select: {
			restaurant: {
				id: true,
				name: true,
				description: true,
				img_url: true,
			},
		},
	});

	const newOrder = new Order();
	newOrder.products = cart.products;
	newOrder.total = cart.subtotal;
	newOrder.restaurant = productOnCart!.restaurant;
	newOrder.user = toSendUser!;

	orderRepository.create(newOrder);
	await orderRepository.save(newOrder);

	cart.products = [];
	cart.subtotal = 0;

	await cartRepository.save(cart);

	return newOrder;
};

export {createOrderService};
