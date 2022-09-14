import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import { mockedRestaurant200 } from '../../mocks';

describe('/restaurant_categories', () => {
  let connection: DataSource;
  let categoryId = '';
  let firstRestaurantId = '';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .then(async (res) => {
        await categoriesQueryBuilder();
      })
      .then(async () => {
        const response = await request(app)
          .post('/restaurants')
          .send(mockedRestaurant200);
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('GET /restaurant_categories - Get all resto categories', async () => {
    const response = await request(app).get('/restaurant_categories');
    categoryId = response.body[0].id;
    expect(response.body).toHaveLength(10);
    expect(response.body[0].name).toEqual('Fast Food');
    expect(response.body[1].name).toEqual('Bakery');
    expect(response.body[2].name).toEqual('Pizzeria');
    expect(response.body[3].name).toEqual('Barbecue');
    expect(response.body[4].name).toEqual('Japanese');
    expect(response.body[5].name).toEqual('Mediterranean');
    expect(response.body[6].name).toEqual('Arabian');
    expect(response.body[7].name).toEqual('Korean');
    expect(response.body[8].name).toEqual('Mexican');
    expect(response.body[9].name).toEqual('Thai');
    expect(response.status).toBe(200);
  });
  test('GET /restaurant_categories/:idCategory/restaurants -Get resto from category', async () => {
    const response = await request(app).get(
      `/restaurant_categories/${categoryId}/restaurants`
    );

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('img_url');
    expect(response.body[0]).toHaveProperty('cnpj');
    expect(response.body[0]).toHaveProperty('phoneNumber');
    expect(response.body[0].category).toHaveProperty('id');
    expect(response.body[0].category).toHaveProperty('name');
    expect(response.body[0].address).toHaveProperty('id');
    expect(response.body[0].address).toHaveProperty('street');
    expect(response.body[0].address).toHaveProperty('number');
    expect(response.body[0].address).toHaveProperty('zipCode');
    expect(response.body[0].address).toHaveProperty('city');
    expect(response.body[0].address).toHaveProperty('state');
    expect(response.body[0].address).toHaveProperty('complement');
    expect(response.body[0]).not.toHaveProperty('password');
    expect(response.status).toBe(200);
  });
});
