import AppDataSource from '../../data-source';
import { Order } from '../../entities/order.entity';

const listOrdersService = async (id: string, isRestaurant: boolean) => {
  const orderRepository = AppDataSource.getRepository(Order);

  if (isRestaurant) {
    const restaurantOrders = await orderRepository.find({
      relations: ['restaurant', 'user.address'],
      where: { restaurant: { id: id } },
    });

    const dataToReturn = restaurantOrders.map((order) => {
      const dataToReturn = {
        order_id: order.id,
        order_status: order.status,
        order_createdAt: order.createdAt.toString(),
        order_total: order.total,
        restaurant: {
          id: order.restaurant.id,
          name: order.restaurant.name,
          description: order.restaurant.description,
          email: order.restaurant.email,
          phoneNumber: order.restaurant.phoneNumber,
          img_url: order.restaurant.img_url,
          cnpj: order.restaurant.cnpj,
        },
        products: order.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          img_url: product.img_url,
          category: product.category,
        })),
        user: {
          id: order.user.id,
          fullName: order.user.fullName,
          userName: order.user.userName,
          email: order.user.email,
          address: {
            street: order.user.address[0].street,
            number: order.user.address[0].number,
            zipCode: order.user.address[0].zipCode,
            city: order.user.address[0].city,
            state: order.user.address[0].state,
            complement: order.user.address[0].complement,
          },
        },
      };

      return dataToReturn;
    });

    return dataToReturn;
  }

  const userOrders = await orderRepository.find({
    relations: { user: true },
    where: { user: { id: id } },
  });

  const dataToReturn = userOrders.map((order) => {
    const dataToReturn = {
      order_id: order.id,
      order_status: order.status,
      order_createdAt: order.createdAt.toString(),
      order_total: order.total,
      user: {
        id: order.user.id,
        fullName: order.user.fullName,
        userName: order.user.userName,
        email: order.user.email,
      },
      products: order.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        img_url: product.img_url,
        category: product.category,
      })),
      restaurant: {
        id: order.restaurant.id,
        name: order.restaurant.name,
        description: order.restaurant.description,
        email: order.restaurant.email,
        cnpj: order.restaurant.cnpj,
        address: order.restaurant.address,
      },
    };

    return dataToReturn;
  });

  return dataToReturn;
};

export { listOrdersService };
