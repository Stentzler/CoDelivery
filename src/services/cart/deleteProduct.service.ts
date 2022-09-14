import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const deleteCartProductService = async (userId: string, prodId: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const cartRepository = AppDataSource.getRepository(Cart);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: { cart: true },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const cart = await cartRepository.findOne({
    where: {
      id: user.cart.id,
    },
  });

  if (!cart) {
    throw new AppError('Not able to find cart', 404);
  }

  const isInCart = cart.products.find((product) => product.id === prodId);

  if (!isInCart) {
    throw new AppError('Product not in the cart', 404);
  }

  cart.products = cart.products.filter((product) => product.id !== prodId);

  const subtotal: number = cart.products.reduce(
    (acc, product) => acc + Number(product.price),
    0
  );
  cart.subtotal = subtotal;

  await cartRepository.save(cart);

  return;
};

export { deleteCartProductService };
