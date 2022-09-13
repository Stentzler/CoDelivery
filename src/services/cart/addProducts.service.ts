import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Products } from '../../entities/products.entity';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const addProductService = async (productId: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      cart: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const cartRepository = AppDataSource.getRepository(Cart);

  const cart = await cartRepository.findOne({
    where: {
      id: user.cart.id,
    },
    relations: {
      products: true,
    },
  });

  if (!cart) {
    throw new AppError('User cart was not found', 404);
  }

  const productRepository = AppDataSource.getRepository(Products);

  const productToAdd = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!productToAdd) {
    throw new AppError('Product was not found', 404);
  }

  if (
    cart.products.filter((product) => product.id === productToAdd.id).length > 0
  ) {
    throw new AppError('Product already in cart', 409);
  }

  if (cart.products.length > 0) {
    const existentProduct = await productRepository.findOne({
      where: { id: cart.products[0].id },
      relations: { restaurant: true },
    });

    const newProduct = await productRepository.findOne({
      where: { id: productId },
      relations: { restaurant: true },
    });

    if (existentProduct?.restaurant.id !== newProduct?.restaurant.id) {
      throw new AppError(
        'Product is not from the same restaurant as the first product',
        409
      );
    }
  }

  cart.products = [...cart.products, productToAdd];

  const subtotal: number = cart.products.reduce(
    (acc, product) => acc + Number(product.price),
    0
  );

  cart.subtotal = subtotal;

  await cartRepository.save(cart);

  return cart;
};

export { addProductService };
