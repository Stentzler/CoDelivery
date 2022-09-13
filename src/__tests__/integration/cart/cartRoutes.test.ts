import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import {
  fakeProductId,
  fakeToken,
  mockedProduct,
  mockedRestaurant200,
  mockedRestaurantLogin,
  mockedUser200,
  mockedUserLogin,
} from '../../mocks';

describe('/cart', () => {
  let connection: DataSource;
  let productId = '';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .then(async (res) => {
        await categoriesQueryBuilder();
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /cart - Should be able to add a product to the cart', async () => {
    const createUser = await request(app).post('/users').send(mockedUser200);

    const createRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const registerProduct = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    productId = registerProduct.body.id;

    const response = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('subtotal');
    expect(response.body.subtotal).toBe(25);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].name).toEqual('X-Tudo');
    expect(response.status).toBe(200);
  });

  test('POST /cart - Should not be able to add an already present product to the cart', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('POST /cart - Should not be able to add a product to the cart without a token', async () => {
    const response = await request(app)
      .post('/cart')
      .send({ prodId: productId });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /cart - Should not be able to add a product to the cart with an invalid token', async () => {
    const response = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /cart - Should not be able to add a product to the cart as a restaurant', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/cart')
      .send({ prodId: productId })
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('POST /cart - Should not be able to add a product that does not exist to the cart', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/cart')
      .send({ prodId: fakeProductId })
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test("GET /cart - Should be able to list a user's cart", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('subtotal');
    expect(response.body.products).toHaveLength(1);
    expect(response.body.subtotal).not.toBe(0);
    expect(response.status).toBe(200);
  });

  test("GET /cart - Should not be able to list a user's cart without a token", async () => {
    const response = await request(app).get('/cart');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("GET /cart - Should not be able to list a user's cart with an invalid token", async () => {
    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /cart - Should not be able to list a cart using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /cart/:id - Should be able to remove a product from the cart', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const deleteRequest = await request(app)
      .delete(`/cart/${productId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(deleteRequest.status).toBe(204);
    expect(response.body.products).toHaveLength(0);
  });

  test('DELETE /cart/:id - Should not be able to remove a product from the cart without a token', async () => {
    const response = await request(app).delete(`/cart/${productId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /cart/:id - Should not be able to remove a product from the cart with an invalid token', async () => {
    const response = await request(app)
      .delete(`/cart/${productId}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /cart/:id - Should not be able to remove a product from the cart using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/cart/${productId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /cart/:id - Should not be able to remove a product that is not in the cart', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/cart/${productId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });
});
