import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import {
  fakeProductId,
  fakeToken,
  mockedMissingProduct,
  mockedProduct,
  mockedProduct2,
  mockedProduct3,
  mockedProduct4,
  mockedRestaurant200,
  mockedRestaurant201,
  mockedRestaurantLogin,
  mockedSecondRestaurantLogin,
  mockedUser200,
  mockedUserLogin,
  productEditData,
  unexistentCategoryProduct,
} from '../../mocks';

describe('/products', () => {
  let connection: DataSource;
  let productId = '';
  let secondProductId = '';
  let thirdProductId = '';

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

    productId = response.body.id;

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

  test('POST /products/:id - Should be able to send an image file to set a picture for a product', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post(`/products/uploadImage/${productId}`)
      .attach('image', 'src/__tests__/assets/hamburger.jpg')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
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

  test('POST /products - Should not be able to register a product as a user', async () => {
    const createUser = await request(app).post('/users').send(mockedUser200);

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/products')
      .send(mockedProduct)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('POST /products - Should not be able to register a product using an unexistent category', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/products')
      .send(unexistentCategoryProduct)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('GET /products - Should be able to list all products', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const anotherProduct = await request(app)
      .post('/products')
      .send(mockedProduct2)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    secondProductId = anotherProduct.body.id;

    const yetAnotherProduct = await request(app)
      .post('/products')
      .send(mockedProduct3)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const response = await request(app).get('/products');

    expect(response.body).toHaveLength(3);
    expect(response.body[0].name).toEqual('X-Tudo');
    expect(response.body[1].name).toEqual('X-Tudão');
    expect(response.body[2].name).toEqual('Coke');
    expect(response.status).toBe(200);
  });

  test('GET /products/:id - Should be able to list a specific product', async () => {
    const response = await request(app).get(`/products/${productId}`);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('img_url');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('isAvailable');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.name).toEqual('X-Tudo');
    expect(response.body.category.name).toEqual('Hamburgers');
    expect(response.body.restaurant.name).toEqual('KenzieBurger');
    expect(response.status).toBe(200);
  });

  test('PATCH /products/:id - Should be able to edit a product', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/products/${productId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const response = await request(app).get(`/products/${productId}`);

    expect(editRequest.status).toBe(200);
    expect(response.body.name).toEqual('X-Kenzie');
    expect(response.body.description).toEqual("Kenzie's Special!");
  });

  test('PATCH /products/:id - Should not be able to edit a product without a token', async () => {
    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(productEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /products/:id - Should not be able to edit a product with an invalid token', async () => {
    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /products/:id - Should not be able to edit a product as a user', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /products/:id - Should not be able to edit a product that does not exist', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/products/${fakeProductId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('PATCH /products/:id - Should not be able to edit a product that belongs to another restaurant', async () => {
    const createSecondRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant201);

    const loginSecondRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedSecondRestaurantLogin);

    const createAnotherProduct = await request(app)
      .post('/products')
      .send(mockedProduct4)
      .set('Authorization', `Bearer ${loginSecondRestaurant.body.token}`);

    thirdProductId = createAnotherProduct.body.id;

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/products/${thirdProductId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /products/:id - Should not be able to edit a product into an already existing name', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/products/${secondProductId}`)
      .send(productEditData)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('DELETE /products/:id - Should be able to delete a product', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const deleteRequest = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    const response = await request(app).get(`/products/${productId}`);

    expect(deleteRequest.status).toBe(204);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('DELETE /products/:id - Should not be able to delete an already deleted product', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('DELETE /products/:id - Should not be able to delete a product without a token', async () => {
    const response = await request(app).delete(`/products/${productId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /products/:id - Should not be able to delete a product with an invalid token', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /products/:id - Should not be able to delete a product as a user', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /products/:id - Should not be able to delete a product that belongs to another restaurant', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/products/${thirdProductId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
