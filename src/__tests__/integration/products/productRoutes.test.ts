import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import {
  fakeToken,
  mockedMissingProduct,
  mockedProduct,
  mockedRestaurant200,
  mockedRestaurantLogin,
  mockedUser200,
  mockedUserLogin,
} from '../../mocks';

describe('/products', () => {
  let connection: DataSource;
  let mainRestaurantId = '';

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

  test('POST /products - Should be able to register a product', async () => {
    const registerRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('img_url');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('isAvailable');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.price).toEqual(25);
    expect(response.body.category.name).toEqual('Hamburgers');
    expect(response.body.restaurant.name).toEqual('KenzieBurger');
    expect(response.body.isAvailable).toEqual(true);
    expect(response.status).toBe(201);
  });

  test('POST /products - The same restaurant should not be able to register two products with the same name', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('POST /products - Should not be able to register a product without a token', async () => {
    const response = await request(app).post('/products').send(mockedProduct);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /products - Should not be able to register a product with an invalid token', async () => {
    const response = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /products - Should not be able to register a product with missing information', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/products')
      .send(mockedMissingProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  // test('POST /products - Should not be able to register a product as a user', async () => {
  //   const createUser = await request(app).post('/users').send(mockedUser200);

  //   const loginUser = await request(app)
  //     .post('/login/users')
  //     .send(mockedUserLogin);

  //   const response = await request(app)
  //     .post('/products')
  //     .send(mockedProduct)
  //     .set('Authorization', `Bearer ${loginUser.body.token}`);

  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(403);
  // });
});
