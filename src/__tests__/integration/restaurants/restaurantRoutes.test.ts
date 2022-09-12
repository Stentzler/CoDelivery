import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import {
  dummyRestaurantEditData,
  dupeRestaurantEditData1,
  dupeRestaurantEditData2,
  dupeRestaurantEditData3,
  fakeToken,
  mockedRestaurant200,
  mockedRestaurant201,
  mockedRestaurantDummy,
  mockedRestaurantLogin,
  restaurantEditData1,
  restaurantEditData2,
  sensibleRestaurantAddressData,
  sensibleRestaurantData,
  wrongData,
} from '../../mocks';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import { randomNumberGenerator } from '../../../utils/randomRemover';

describe('/restaurants', () => {
  let connection: DataSource;
  let firstRestaurantId = '';
  let secondRestaurantId = '';

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

  test('POST /restaurants - Should be able to create a restaurant', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    firstRestaurantId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('cnpj');
    expect(response.body).toHaveProperty('phoneNumber');
    expect(response.body).toHaveProperty('img_url');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.category).toHaveProperty('id');
    expect(response.body.category).toHaveProperty('name');
    expect(response.body.address).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('street');
    expect(response.body.address).toHaveProperty('number');
    expect(response.body.address).toHaveProperty('zipCode');
    expect(response.body.address).toHaveProperty('city');
    expect(response.body.address).toHaveProperty('state');
    expect(response.body.address).toHaveProperty('complement');
    expect(response.body).not.toHaveProperty('password');
    expect(response.status).toBe(201);
  });

  test('POST /restaurants/uploadImage/:id - Should be able to send an image file to set a profile picture', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post(`/restaurants/uploadImage/${firstRestaurantId}`)
      .attach('image', 'src/__tests__/assets/logo.webp')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
  });

  test('POST /restaurants - Should not be able to create an already existent restaurant', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('POST /restaurants - Should not be able to create a restaurant with missing information 1 - Restaurant data', async () => {
    const newRestaurant = { ...mockedRestaurantDummy };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newRestaurant.name;
      case 1:
        // @ts-expect-error
        delete newRestaurant.description;
      case 2:
        // @ts-expect-error
        delete newRestaurant.email;
      case 3:
        // @ts-expect-error
        delete newRestaurant.password;
    }

    const response = await request(app)
      .post('/restaurants')
      .send(newRestaurant);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /restaurants - Should not be able to create a restaurant with missing information 2 - Restaurant address data', async () => {
    const newRestaurant = { ...mockedRestaurantDummy };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newRestaurant.address.address;
      case 1:
        // @ts-expect-error
        delete newRestaurant.address.city;
      case 2:
        // @ts-expect-error
        delete newRestaurant.address.zipCode;
      case 3:
        // @ts-expect-error
        delete newRestaurant.address.number;
    }

    const response = await request(app)
      .post('/restaurants')
      .send(newRestaurant);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /restaurants - Should be able to list all restaurants', async () => {
    const createSecondRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant201);

    secondRestaurantId = createSecondRestaurant.body.id;

    const response = await request(app).get('/restaurants');

    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toEqual('KenzieBurger');
    expect(response.body[1].name).toEqual('KenzieYa');
    expect(response.status).toBe(200);
  });

  test('GET /restaurants/profile - Should be able to list own restaurant', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get('/restaurants/profile')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('cnpj');
    expect(response.body).toHaveProperty('phoneNumber');
    expect(response.body).toHaveProperty('img_url');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.category).toHaveProperty('id');
    expect(response.body.category).toHaveProperty('name');
    expect(response.body.address).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('street');
    expect(response.body.address).toHaveProperty('number');
    expect(response.body.address).toHaveProperty('zipCode');
    expect(response.body.address).toHaveProperty('city');
    expect(response.body.address).toHaveProperty('state');
    expect(response.body.address).toHaveProperty('complement');
    expect(response.body).not.toHaveProperty('password');
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('KenzieBurger');
  });

  test('GET /restaurants/profile - Should not be able to list own restaurant without a token', async () => {
    const response = await request(app).get('/restaurants/profile');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /restaurants/profile - Should not be able to list own restaurant with an invalid token', async () => {
    const response = await request(app)
      .get('/restaurants/profile')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("PATCH /restaurants/:id - Should be able to edit a restaurant's data 1 - Restaurant data", async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(restaurantEditData1)
      .set('Authorization', `Bearer ${login.body.token}`);

    const response = await request(app)
      .get('/restaurants/profile')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.status).toBe(204);
    expect(response.body.name).toEqual('KenzieHappyBurgers');
  });

  test("PATCH /restaurants/:id - Should be able to edit a restaurant's data 2 - Restaurant address data", async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(restaurantEditData2)
      .set('Authorization', `Bearer ${login.body.token}`);

    const response = await request(app)
      .get('/restaurants/profile')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.status).toBe(204);
    expect(response.body.address.street).toEqual('Rua Cortes');
    expect(response.body.address.number).toEqual('928');
    expect(response.body.address.zipCode).toEqual('22725-430');
    expect(response.body.address.city).toEqual('Andiroba');
    expect(response.body.address.state).toEqual('MG');
  });

  test("PATCH /restaurants/:id - Should not be able to edit a restaurant's data without a token", async () => {
    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(dupeRestaurantEditData1);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(401);
  });

  test("PATCH /restaurants/:id - Should not be able to edit a restaurant's data with an invalid token", async () => {
    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(dupeRestaurantEditData1)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(401);
  });

  test('PATCH /restaurants/:id - Should not be able to edit a restaurant other than itself', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${secondRestaurantId}`)
      .send(dummyRestaurantEditData)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(401);
  });

  test('PATCH /restaurants/:id - Should not be able to edit into duplicate values 1 - Name', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(dupeRestaurantEditData1)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(409);
  });

  test('PATCH /restaurants/:id - Should not be able to edit into duplicate values 2 - Email', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(dupeRestaurantEditData2)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(409);
  });

  test('PATCH /restaurants/:id - Should not be able to edit into duplicate values 3 - CNPJ', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(dupeRestaurantEditData3)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(409);
  });

  test('PATCH /restaurants/:id - Should not be able to edit sensible data 1 - Restaurant data', async () => {
    const index = randomNumberGenerator(4);

    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(sensibleRestaurantData[index])
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(403);
  });

  test('PATCH /restaurants/:id - Should not be able to edit sensible data 2 - Restaurant address data', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(sensibleRestaurantAddressData)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(403);
  });

  test('PATCH /restaurants/:id - Should not be able to edit using wrong key properties', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const editRequest = await request(app)
      .patch(`/restaurants/${firstRestaurantId}`)
      .send(wrongData)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(editRequest.body).toHaveProperty('message');
    expect(editRequest.status).toBe(422);
  });

  test('DELETE /restaurants/:id - Should be able to (soft) delete a restaurant', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const deleteRequest = await request(app)
      .delete(`/restaurants/${firstRestaurantId}`)
      .set('Authorization', `Bearer ${login.body.token}`);

    const profile = await request(app)
      .get('/restaurants/profile')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(deleteRequest.status).toBe(204);
    expect(profile.body).toHaveProperty('name');
    expect(profile.body.name).toEqual('KenzieHappyBurgers');
    expect(profile.body.isActive).toEqual(false);
  });

  test('DELETE /restaurants/:id - Should not be able to login as a (soft) deleted restaurant', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    expect(login.body).toHaveProperty('message');
    expect(login.status).toBe(403);
  });

  test('DELETE /restaurants/:id - Should not be able to (soft) delete a restaurant without a token', async () => {
    const deleteRequest = await request(app).delete(
      `/restaurants/${firstRestaurantId}`
    );

    expect(deleteRequest.body).toHaveProperty('message');
    expect(deleteRequest.status).toBe(401);
  });

  test('DELETE /restaurants/:id - Should not be able to delete a restaurant with an invalid token', async () => {
    const deleteRequest = await request(app)
      .delete(`/restaurants/${firstRestaurantId}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(deleteRequest.body).toHaveProperty('message');
    expect(deleteRequest.status).toBe(401);
  });

  test('DELETE /restaurants/:id - Should not be able to (soft) delete a restaurant other than itself', async () => {
    const login = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const deleteRequest = await request(app)
      .delete(`/restaurants/${secondRestaurantId}`)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(deleteRequest.body).toHaveProperty('message');
    expect(deleteRequest.status).toBe(401);
  });
});
