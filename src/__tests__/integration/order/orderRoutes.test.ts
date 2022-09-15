import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import {
  fakeOrderId,
  fakeToken,
  mockedProduct,
  mockedProduct4,
  mockedRestaurant200,
  mockedRestaurant201,
  mockedRestaurantLogin,
  mockedSecondRestaurantLogin,
  mockedUser200,
  mockedUser201,
  mockedUser201Login,
  mockedUserLogin,
  userAddress200,
  userAddressDummy,
  userPaymentInfo200,
  userPaymentInfoDummy,
  userPaymentInfoDummy2,
} from '../../mocks';
import { Order } from '../../../entities/order.entity';

describe('/order', () => {
  let connection: DataSource;
  let createdUserId = '';
  let createdUserId2 = '';
  let productId = '';
  let orderId = '';
  let secondOrderId = '';
  let thirdOrderId = '';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .then((res) => {
        categoriesQueryBuilder();
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /order - Should be able to create an order', async () => {
    const createUser = await request(app).post('/users').send(mockedUser200);

    createdUserId = createUser.body.id;

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const registerPaymentInfo = await request(app)
      .post(`/users/payment_info/${createdUserId}`)
      .send(userPaymentInfo200);

    const registerUserAddress = await request(app)
      .post('/users/addresses')
      .send(userAddress200)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const createRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const registerProduct = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    productId = registerProduct.body.id;

    const addToCart = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('products');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('restaurant');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('status');
    expect(response.body.products).toHaveLength(1);
    expect(response.body.total).toEqual(25);
    expect(response.body.restaurant).toHaveProperty('id');
    expect(response.body.restaurant).not.toHaveProperty('password');
    expect(response.body.restaurant).not.toHaveProperty('updatedAt');
    expect(response.body.restaurant).not.toHaveProperty('createdAt');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.user).not.toHaveProperty('updatedAt');
    expect(response.body.user).not.toHaveProperty('createdAt');
    expect(response.body.status).toEqual('Order sent to the restaurant');
    expect(response.status).toBe(201);
  });

  test('POST /order - Should not be able to create an order without a token', async () => {
    const response = await request(app).post('/order');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /order - Should not be able to create an order with an invalid token', async () => {
    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /order - Should not be able to create an order as a restaurant', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('POST /order - Should not be able to create an order when the user does not have an address registered', async () => {
    const createSecondUser = await request(app)
      .post('/users')
      .send(mockedUser201);

    createdUserId2 = createSecondUser.body.id;

    const loginSecondUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const registerPaymentInfo = await request(app)
      .post(`/users/payment_info/${createdUserId2}`)
      .send(userPaymentInfoDummy2);

    const addToCart = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('POST /order - Should not be able to create an order when the user does not have a payment/card information', async () => {
    const loginSecondUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const deletePaymentReq = await request(app)
      .delete(`/users/payment_info/${createdUserId2}`)
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    const registerUserAddress = await request(app)
      .post('/users/addresses')
      .send(userAddressDummy)
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('POST /order - Should not be able to create an order with an empty cart', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /order - As a user, should be able to list all orders made', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('order_id');
    expect(response.body[0]).toHaveProperty('order_status');
    expect(response.body[0]).toHaveProperty('order_createdAt');
    expect(response.body[0]).toHaveProperty('order_total');
    expect(response.body[0].restaurant.name).toEqual('KenzieBurger');
    expect(response.body[0].products).toHaveLength(1);
    expect(response.body[0].products[0].name).toEqual('X-Tudo');
    expect(response.body[0].user.email).toEqual(mockedUserLogin.email);
    expect(response.status).toBe(200);
  });

  test('GET /order - As a restaurant, should be able to list all orders received', async () => {
    const loginSecondUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const registerPaymentInfo = await request(app)
      .post(`/users/payment_info/${createdUserId2}`)
      .send(userPaymentInfoDummy2);

    const createOrder = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    secondOrderId = createOrder.body.id;

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    orderId = response.body[0].order_id;

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('order_id');
    expect(response.body[0]).toHaveProperty('order_status');
    expect(response.body[0]).toHaveProperty('order_createdAt');
    expect(response.body[0]).toHaveProperty('order_total');
    expect(response.body[0].user).not.toEqual(response.body[1].user);
    expect(response.status).toBe(200);
  });

  test('GET /order - Should not be able to list orders without a token', async () => {
    const response = await request(app).get('/order');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /order - Should not be able to list orders with an invalid token', async () => {
    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /order/:id - As a restaurant, should be able to change the status of an order', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const updateOrder = await request(app)
      .patch(`/order/${orderId}`)
      .send({ updateOrderStatus: 'Order Received' })
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const index = response.body.findIndex(
      (order: any) => order.order_id === orderId
    );

    expect(updateOrder.status).toBe(204);
    expect(response.body[index].order_status).toEqual('Order Received');
  });

  test('PATCH /order/:id - As a restaurant, should not be able to change the status of an order to something inappropriate', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/order/${orderId}`)
      .send({ updateOrderStatus: 'To be or not to be' })
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /order/:id - As a restaurant, should not be able to change the status of an order that does not exist', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/order/${fakeOrderId}`)
      .send({ updateOrderStatus: 'Order Received' })
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('PATCH /order/:id - As a restaurant, should not be able to change an order from another restaurant', async () => {
    const createSecondRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant201);

    const loginSecondRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedSecondRestaurantLogin);

    const registerAnotherProduct = await request(app)
      .post('/products')
      .send(mockedProduct4)
      .set('Authorization', `Bearer ${loginSecondRestaurant.body.token}`);

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const addToCart = await request(app)
      .post('/cart')
      .send({ prodId: registerAnotherProduct.body.id })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const createAnotherOrder = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    thirdOrderId = createAnotherOrder.body.id;

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/order/${thirdOrderId}`)
      .send({ updateOrderStatus: 'Order Received' })
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /order/:id - As a user, should not be able to change the status of an order', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/order/${orderId}`)
      .send({ updateOrderStatus: 'Order Received' })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /order/:id - Should not be able to change the status of an order without a token', async () => {
    const response = await request(app)
      .patch(`/order/${orderId}`)
      .send({ updateOrderStatus: 'Order Received' });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /order/:id - Should not be able to change the status of an order with an invalid token', async () => {
    const response = await request(app)
      .patch(`/order/${orderId}`)
      .send({ updateOrderStatus: 'Order Received' })
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /order/:id - As a restaurant, should be able to delete an order', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const deleteReq = await request(app)
      .delete(`/order/${secondOrderId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(deleteReq.status).toBe(204);
    expect(response.body).toHaveLength(1);
  });

  test('DELETE /order/:id - As a restaurant, should not be able to delete an order that does not exist', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/order/${fakeOrderId}`)
      .set('Authorization', `${loginRestaurant.body.token}`);
  });

  test('DELETE /order/:id - As a restaurant, should not be able to delete an order that has already started being prepared', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/order/${orderId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /order/:id - As a restaurant, should not be able to delete an order that belongs to another restaurant', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/order/${thirdOrderId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /order/:id - As a user, should be able to delete an order', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const addToCart = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const createOrder = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const deleteOrder = await request(app)
      .delete(`/order/${createOrder.body.id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(deleteOrder.status).toBe(204);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].order_status).toEqual('Order Received');
  });

  test('DELETE /order/:id - As a user, should not be able to delete an order that does not exist', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/order/${fakeOrderId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('DELETE /order/:id - As a user, should not be able to delete an order that has already started being prepared', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/order/${orderId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /order/:id - As a user, should not be able to delete an order that belongs to another user', async () => {
    const loginSecondUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/order/${thirdOrderId}`)
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /order/:id - Should not be able to delete an order without a token', async () => {
    const response = await request(app).delete(`/order/${thirdOrderId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /order/:id - Should not be able to delete an order with an invalid token', async () => {
    const response = await request(app)
      .delete(`/order/${thirdOrderId}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
