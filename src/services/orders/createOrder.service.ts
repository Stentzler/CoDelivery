import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../errors/AppError";
import { Products } from "../../entities/products.entity";
import { Restaurant } from "../../entities/restaurant.entity";

const createOrderService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const cartRepository = AppDataSource.getRepository(Cart);
  const orderRepository = AppDataSource.getRepository(Order);
  const productRepository = AppDataSource.getRepository(Products);

  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("This user is not active", 403);
  }

  if (!user?.paymentInfo) {
    throw new AppError("You need to register a payment method", 404);
  }

  if (
    user.paymentInfo.cpf === "" ||
    user.paymentInfo.expireDate === "" ||
    user.paymentInfo.cvvNo === "" ||
    user.paymentInfo.cardNo === "" ||
    user.paymentInfo.name === ""
  ) {
    throw new AppError("You need to register a payment method", 404);
  }

  const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });
  if (!cart) {
    throw new AppError("There is no cart", 400);
  }

  if (cart.products.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  const productOnCart = await productRepository.findOne({
    relations: {
      restaurant: {
        id: true,
        name: true,
        description: true,
        img_url: true,
        phoneNumber: true,
        address: true,
      },
    },
    where: { id: cart.products[0].id },
  });

  const newOrder = new Order();
  newOrder.products = cart.products;
  newOrder.total = cart.subtotal;
  newOrder.restaurant = productOnCart!.restaurant;
  newOrder.user = user;

  orderRepository.create(newOrder);
  await orderRepository.save(newOrder);

  cart.products = [];
  cart.subtotal = 0;

  await cartRepository.save(cart);

  const orderReturned = orderRepository.findOne({ where: { id: newOrder.id } });

  return orderReturned;
};

export { createOrderService };
