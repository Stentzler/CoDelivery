import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import {
  loginNoEmail,
  loginNoPassword,
  loginWrongPassword,
  mockedRestaurant200,
  mockedRestaurantLogin,
  mockedRestaurantLoginNoEmail,
  mockedRestaurantLoginNoPassword,
  mockedRestaurantLoginWrongPassword,
  mockedUser200,
  mockedUserLogin,
} from '../../mocks';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';

describe('/login', () => {
  let connection: DataSource;

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

  test('POST /login/users - Should be able to successfully login', async () => {
    const createUser = await request(app).post('/users').send(mockedUser200);

    console.log(createUser.body);

    const response = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  test('POST /login/users - Should not be able to login without an email', async () => {
    const response = await request(app).post('/login/users').send(loginNoEmail);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/users - Should not be able to login without a password', async () => {
    const response = await request(app)
      .post('/login/users')
      .send(loginNoPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/users - Should not be able to login with a wrong password', async () => {
    const response = await request(app)
      .post('/login/users')
      .send(loginWrongPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('POST /login/restaurants - Should be able to successfully login', async () => {
    const createRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    const response = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  test('POST /login/restaurants - Should not be able to login without an email', async () => {
    const response = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLoginNoEmail);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/restaurants - Should not be able to login without a password', async () => {
    const response = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLoginNoPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/restaurants - Should not be able login with a wrong password', async () => {
    const response = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLoginWrongPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
