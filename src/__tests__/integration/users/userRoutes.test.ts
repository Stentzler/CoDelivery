import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../data-source';
import app from '../../../app';
import {
  editData1,
  editData2,
  editData3,
  fakeToken,
  mockedUser200,
  mockedUser201,
  mockedUser201Login,
  mockedUserLogin,
  mockedUserSecond,
  sensibleDataAddressInfo,
  sensibleDataCartInfo,
  sensibleDataPaymentInfo,
  sensibleDataUser,
} from '../../mocks';
import { randomNumberGenerator } from '../../../utils/randomRemover';

describe('/users', () => {
  let connection: DataSource;
  let createdUser201Id = '';
  let createdUserSecondId = '';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /users - Should be able to create a user', async () => {
    const response = await request(app).post('/users').send(mockedUser200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('fullName');
    expect(response.body).toHaveProperty('userName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('addressInfo');
    expect(response.body).toHaveProperty('cart');
    expect(response.body).toHaveProperty('paymentInfo');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.addressInfo).toHaveProperty('id');
    expect(response.body.addressInfo).toHaveProperty('address');
    expect(response.body.addressInfo).toHaveProperty('number');
    expect(response.body.addressInfo).toHaveProperty('zipCode');
    expect(response.body.addressInfo).toHaveProperty('city');
    expect(response.body.addressInfo).toHaveProperty('state');
    expect(response.body.addressInfo).toHaveProperty('complement');
    expect(response.body.cart).toHaveProperty('id');
    expect(response.body.cart).toHaveProperty('subtotal');
    expect(response.body).not.toHaveProperty('password');
    expect(response.body.isRestaurant).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test('POST /users - Should not be able to create a user with an already registered email', async () => {
    const response = await request(app).post('/users').send(mockedUser200);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /users - Should not be able to create a user with missing information 1 - User data', async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();
    // Deleting a random property to avoid playing the system
    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.email;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.fullName;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.userName;
        break;
      default:
        // @ts-expect-error
        delete newUser.password;
    }

    const response = await request(app).post('/users').send(newUser);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /users - Should not be able to create a user with missing information 2 - User address info', async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.addressInfo.address;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.addressInfo.city;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.addressInfo.zipCode;
        break;
      default:
        // @ts-expect-error
        delete newUser.addressInfo.state;
    }

    const response = await request(app).post('/users').send(newUser);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /users - Should not be able to create a user with missing information 3 - User payment info', async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.paymentInfo.cardNo;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.paymentInfo.cpf;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.paymentInfo.cvvNo;
        break;
      default:
        // @ts-expect-error
        delete newUser.paymentInfo.expireDate;
    }

    const response = await request(app).post('/users').send(newUser);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /users/:id - Should list the user', async () => {
    const createdUser = await request(app).post('/users').send(mockedUser201);

    createdUser201Id = createdUser.body.id;

    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .get(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('fullName');
    expect(response.body[0]).toHaveProperty('userName');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('isRestaurant');
    expect(response.body[0]).toHaveProperty('isActive');
    expect(response.body[0]).toHaveProperty('addressInfo');
    expect(response.body[0]).toHaveProperty('cart');
    expect(response.body[0]).toHaveProperty('paymentInfo');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0].addressInfo).toHaveProperty('id');
    expect(response.body[0].addressInfo).toHaveProperty('address');
    expect(response.body[0].addressInfo).toHaveProperty('number');
    expect(response.body[0].addressInfo).toHaveProperty('zipCode');
    expect(response.body[0].addressInfo).toHaveProperty('city');
    expect(response.body[0].addressInfo).toHaveProperty('state');
    expect(response.body[0].addressInfo).toHaveProperty('complement');
    expect(response.body[0].cart).toHaveProperty('id');
    expect(response.body[0].cart).toHaveProperty('subtotal');
    expect(response.body[0]).not.toHaveProperty('password');
    expect(response.body[0].isRestaurant).toEqual(false);
    expect(response.body[0].isActive).toEqual(true);
    expect(response.status).toBe(200);
  });

  test('GET /users/:id - Should not be able to list a user without a token', async () => {
    const response = await request(app).get(`/users/${createdUser201Id}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/:id - Should not be able to list a user with an invalid token', async () => {
    const response = await request(app)
      .get(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/:id - Should not be able to list a user other than self', async () => {
    const secondUser = await request(app).post('/users').send(mockedUserSecond);

    createdUserSecondId = secondUser.body.id;

    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .get(`/users/${secondUser.body.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - Should be able to successfully edit a user 1 - User data', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
  });

  test('PATCH /users/:id - Should be able to successfully edit a user 2 - User address info', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(editData2);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
  });

  test('PATCH /users/:id - Should be able to successfully edit a user 3 - User payment info', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(editData3);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
  });

  test('PATCH /users/:id - Should not be able to edit a user without a token', async () => {
    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - Should not be able to edit a user with an invalid token', async () => {
    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${fakeToken}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - Should not be able to edit a user other than self', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUserSecondId}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - Should not be able to edit sensible information 1 - User data', async () => {
    const value = randomNumberGenerator();

    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(sensibleDataUser[value]);

    console.log(sensibleDataUser[value]);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/:id - Should not be able to edit sensible information 2 - User address info', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(sensibleDataAddressInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/:id - Should not be able to edit sensible information 3 - Payment address info', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(sensibleDataPaymentInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/:id - Should not be able to edit sensible information 4 - Cart info', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(sensibleDataCartInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
