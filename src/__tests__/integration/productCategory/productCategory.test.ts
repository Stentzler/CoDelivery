import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import {
  mockedProduct,
  mockedRestaurant200,
  mockedRestaurantLogin,
} from '../../mocks';
describe('/restaurant_categories', () => {
  let connection: DataSource;
  let categoryId = '';
  let productId = '';
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .then(async (res) => {
        await categoriesQueryBuilder();
      })
      .then(async () => {
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
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('GET /products_categories - Should be able to get all product categories', async () => {
    const response = await request(app).get('/products_categories');

    categoryId = response.body[2].id;

    expect(response.body).toHaveLength(9);
    expect(response.body[0].name).toEqual('Drinks');
    expect(response.body[1].name).toEqual('Pizzas');
    expect(response.body[2].name).toEqual('Hamburgers');
    expect(response.body[3].name).toEqual('Sushis');
    expect(response.body[4].name).toEqual('Pasta');
    expect(response.body[5].name).toEqual('Ice Cream');
    expect(response.body[6].name).toEqual('Vegan');
    expect(response.body[7].name).toEqual('Vegetarian');
    expect(response.body[8].name).toEqual('Fit');
    expect(response.status).toBe(200);
  });
  test('GET /products_categories/:idCategory/products - Should be able to list all products from a category', async () => {
    const response = await request(app).get(
      `/products_categories/${categoryId}/products`
    );

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('price');
    expect(response.body[0]).toHaveProperty('img_url');
    expect(response.body[0]).toHaveProperty('isAvailable');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0].category).toHaveProperty('id');
    expect(response.body[0].category).toHaveProperty('name');
    expect(response.status).toBe(200);
  });
});
