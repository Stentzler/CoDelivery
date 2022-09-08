import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { mockedRestaurant200 } from '../../mocks';
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

  test('POST /restaurants - Should be able to create a restaurant', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('cnpj');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.category).toHaveProperty('id');
    expect(response.body.category).toHaveProperty('name');
    expect(response.body.restaurantAddress).toHaveProperty('id');
    expect(response.body.restaurantAddress).toHaveProperty('address');
    expect(response.body.restaurantAddress).toHaveProperty('number');
    expect(response.body.restaurantAddress).toHaveProperty('phoneNumber');
    expect(response.body.restaurantAddress).toHaveProperty('zipCode');
    expect(response.body.restaurantAddress).toHaveProperty('city');
    expect(response.body.restaurantAddress).toHaveProperty('state');
    expect(response.body.restaurantAddress).toHaveProperty('complement');
    expect(response.body).not.toHaveProperty('password');
    expect(response.status).toBe(201);
  });

  test('POST /restaurants - Should not be able to create an already existent restaurant', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    console.log(response.body);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });
});
