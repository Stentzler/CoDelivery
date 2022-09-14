import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../data-source';
import app from '../../../app';
import {
  editData1,
  editData2,
  editData3,
  fakeAddressId,
  fakeToken,
  mockedRestaurant200,
  mockedRestaurantLogin,
  mockedUser200,
  mockedUser201,
  mockedUser201Login,
  mockedUserLogin,
  mockedUserSecond,
  sensibleDataAddressInfo,
  sensibleDataCartInfo,
  sensibleDataPaymentInfo,
  sensibleDataUser,
  userAddress200,
  userAddressDummy,
  userAddressDummy2,
  userAddressDummy3,
  userAddressEditData,
  userPaymentInfo200,
  userPaymentInfoDummy,
  userPaymentInfoDummy2,
  userPaymentInfoDummy3,
  userPaymentInfoEditData,
} from '../../mocks';
import { randomNumberGenerator } from '../../../utils/randomRemover';
import { categoriesQueryBuilder } from '../../../utils/categoriesQueryBuilder';
import { UserAddress } from '../../../entities/userAddresses.entity';

describe('/users', () => {
  let connection: DataSource;
  let createdUser200Id = '';
  let createdUser201Id = '';
  let createdUserSecondId = '';
  let userAddressId200 = '';
  let userAddressId201 = '';
  let persistentToken = '';

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

  test('POST /users - Should be able to create a user', async () => {
    const response = await request(app).post('/users').send(mockedUser200);

    createdUser200Id = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('fullName');
    expect(response.body).toHaveProperty('userName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('cart');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
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

  test('POST /users - Should not be able to create a user with missing information', async () => {
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

  test('POST /users/addresses - Should be able to register an address to an existing user', async () => {
    const userLogin = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/users/addresses')
      .send(userAddress200)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    userAddressId200 = response.body.address[0].id;

    expect(response.body).toHaveProperty('userName');
    expect(response.body).toHaveProperty('email');
    expect(response.body.address[0]).toHaveProperty('id');
    expect(response.body.address[0]).toHaveProperty('street');
    expect(response.body.address[0]).toHaveProperty('number');
    expect(response.body.address[0]).toHaveProperty('zipCode');
    expect(response.body.address[0]).toHaveProperty('city');
    expect(response.body.address[0]).toHaveProperty('state');
    expect(response.body.address[0]).toHaveProperty('complement');
    expect(response.status).toBe(201);
  });

  test('POST /users/addresses - Should not be able to register an address with missing information', async () => {
    const newAddress = { ...userAddressDummy };
    const value = randomNumberGenerator(4);

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newAddress.street;
        break;
      case 1:
        // @ts-expect-error
        delete newAddress.city;
        break;
      case 2:
        // @ts-expect-error
        delete newAddress.zipCode;
        break;
      case 3:
        // @ts-expect-error
        delete newAddress.state;
      case 4:
        // @ts-expect-error
        delete newAddress.number;
    }

    const response = await request(app).post('/users').send(newAddress);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /users/addresses - Should not be accessible with a restaurant token', async () => {
    const createRestaurant = await request(app)
      .post('/restaurants')
      .send(mockedRestaurant200);

    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .post('/users/addresses')
      .send(userAddress200)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test("POST /users/payment_info:id - Should be able to register a user's payment/card information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/users/payment_info/${createdUser200Id}`)
      .send(userPaymentInfo200);

    const proofCheck = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.status).toBe(201);
    expect(proofCheck.body.paymentInfo).toHaveProperty('id');
    expect(proofCheck.body.paymentInfo).toHaveProperty('name');
    expect(proofCheck.body.paymentInfo).toHaveProperty('cardNo');
    expect(proofCheck.body.paymentInfo).toHaveProperty('cvvNo');
    expect(proofCheck.body.paymentInfo).toHaveProperty('expireDate');
    expect(proofCheck.body.paymentInfo).toHaveProperty('cpf');
    expect(proofCheck.body.paymentInfo.cardNo).toEqual(
      userPaymentInfo200.cardNo
    );
  });

  test('POST /users/payment_info/:id - Should not be able to add a second payment/card information', async () => {
    const response = await request(app)
      .post(`/users/payment_info/${createdUser200Id}`)
      .send(userPaymentInfo200);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('POST /users/payment_info/:id - Should not be able to register a payment/card information with an already registered CPF', async () => {
    const createdUser = await request(app).post('/users').send(mockedUser201);

    createdUser201Id = createdUser.body.id;

    const response = await request(app)
      .post(`/users/payment_info/${createdUser201Id}`)
      .send(userPaymentInfo200);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('POST /users/payment_info/:id - Should not be able to register a payment/card information with missing information', async () => {
    const newPaymentInfo = { ...userPaymentInfoDummy };
    const value = randomNumberGenerator(5);

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newPaymentInfo.cardNo;
        break;
      case 1:
        // @ts-expect-error
        delete newPaymentInfo.cpf;
        break;
      case 2:
        // @ts-expect-error
        delete newPaymentInfo.cvvNo;
        break;
      case 3:
        // @ts-expect-error
        delete newPaymentInfo.expireDate;
      case 4:
        // @ts-expect-error
        delete newPaymentInfo.name;
    }

    const response = await request(app).post('/users').send(newPaymentInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /users/profile - Should be able to list the user', async () => {
    const loginResponse = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/users/profile`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('fullName');
    expect(response.body).toHaveProperty('userName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('isRestaurant');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('paymentInfo');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.address[0]).toHaveProperty('id');
    expect(response.body.address[0]).toHaveProperty('street');
    expect(response.body.address[0]).toHaveProperty('number');
    expect(response.body.address[0]).toHaveProperty('zipCode');
    expect(response.body.address[0]).toHaveProperty('city');
    expect(response.body.address[0]).toHaveProperty('state');
    expect(response.body.address[0]).toHaveProperty('complement');
    expect(response.body.paymentInfo).toHaveProperty('id');
    expect(response.body.paymentInfo).toHaveProperty('name');
    expect(response.body.paymentInfo).toHaveProperty('cardNo');
    expect(response.body.paymentInfo).toHaveProperty('cvvNo');
    expect(response.body.paymentInfo).toHaveProperty('expireDate');
    expect(response.body.paymentInfo).toHaveProperty('cpf');
    expect(response.body).not.toHaveProperty('password');
    expect(response.body.isRestaurant).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(200);
  });

  test('GET /users/profile - Should not be able to list a user without a token', async () => {
    const response = await request(app).get(`/users/profile`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/profile - Should not be able to list a user with an invalid token', async () => {
    const response = await request(app)
      .get(`/users/profile`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/profile - Should not be accessible with a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get(`/users/profile`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test("GET /users/addresses - Should be able to list a user's addresses", async () => {
    const userLogin = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const addAddress = await request(app)
      .post('/users/addresses')
      .send(userAddressDummy2)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(response.body.address).toHaveLength(2);
    expect(response.body.address[0].street).toEqual(
      'Rua Dourival Monteiro da Silva'
    );
    expect(response.body.address[1].street).toEqual(
      'Rua Lobato Monteiro da Silva'
    );
    expect(response.status).toBe(200);
  });

  test("GET /users/addresses - Should not able to list a user's addresses without a token", async () => {
    const response = await request(app).get('/users/addresses');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("GET /users/addresses - Should not able to list a user's addresses with an invalid token", async () => {
    const response = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/addresses - Should not be accessible with a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test("GET /users/payment_info/:id - Should be able to list a user's payment/card information", async () => {
    const userLogin = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('cardNo');
    expect(response.body).toHaveProperty('cvvNo');
    expect(response.body).toHaveProperty('expireDate');
    expect(response.body).toHaveProperty('cpf');
    expect(response.status).toBe(200);
  });

  test("GET /users/payment_info/:id - Should not be able to list a user's payment/card information without a token", async () => {
    const response = await request(app).get(
      `/users/payment_info/${createdUser200Id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("GET /users/payment_info/:id - Should not be able to list a user's payment/card information with an invalid token", async () => {
    const response = await request(app)
      .get(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/payment_info/:id - Should not be accessible with a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .get(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/:id - Should be able to successfully edit a user', async () => {
    const userLogin = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const userEdit = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${userLogin.body.token}`)
      .send(editData1);

    const response = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(userEdit.status).toBe(204);
    expect(response.body.userName).toEqual('Joaninha');
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
    const secondUser = await request(app).post('/users').send(mockedUser201);

    createdUserSecondId = secondUser.body.id;

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/${createdUserSecondId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - Should not be able to edit a user using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/users/${createdUserSecondId}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`)
      .send(editData1);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/:id - Should not be able to edit sensible information', async () => {
    const value = randomNumberGenerator();

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(sensibleDataUser[value]);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test("PATCH /users/addresses/:id - Should be able to successfully edit a user's address information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const addressEdit = await request(app)
      .patch(`/users/addresses/${userAddressId200}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userAddressEditData);

    const response = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const index = response.body.address.findIndex(
      (element: UserAddress) => element.id === userAddressId200
    );

    expect(addressEdit.status).toBe(204);
    expect(response.body.address[index]).toHaveProperty('id');
    expect(response.body.address[index]).toHaveProperty('street');
    expect(response.body.address[index]).toHaveProperty('number');
    expect(response.body.address[index]).toHaveProperty('zipCode');
    expect(response.body.address[index]).toHaveProperty('city');
    expect(response.body.address[index]).toHaveProperty('state');
    expect(response.body.address[index]).toHaveProperty('complement');
    expect(response.body.address[index].street).toEqual(
      userAddressEditData.street
    );
    expect(response.body.address[index].number).toEqual(
      userAddressEditData.number
    );
  });

  test("PATCH /users/addresses/:id - Should not be able to edit a user's address information without a token", async () => {
    const response = await request(app)
      .patch(`/users/addresses/${userAddressId200}`)
      .send(userAddressEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("PATCH /users/addresses/:id - Should not be able to edit a user's address information with an invalid token", async () => {
    const response = await request(app)
      .patch(`/users/addresses/${userAddressId200}`)
      .set('Authorization', `Bearer ${fakeToken}`)
      .send(userAddressEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/addresses/:id - Should not be able to edit an address that belongs to another user', async () => {
    const loginSecondUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const addressSecondUser = await request(app)
      .post('/users/addresses')
      .send(userAddressDummy3)
      .set('Authorization', `Bearer ${loginSecondUser.body.token}`);

    userAddressId201 = addressSecondUser.body.address[0].id;

    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/addresses/${userAddressId201}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userAddressEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('PATCH /users/addresses/:id - Should not be able to edit an address using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/users/addresses/${userAddressId200}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`)
      .send(userAddressEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/addresses/:id - Should not be able to edit an address that does not exist', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/addresses/${fakeAddressId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userAddressEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test("PATCH /users/payment_info/:id - Should be able to successfully edit a user's payment/card information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const editPaymentInfo = await request(app)
      .patch(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userPaymentInfoEditData);

    const response = await request(app)
      .get(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(editPaymentInfo.status).toBe(204);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('cardNo');
    expect(response.body).toHaveProperty('cvvNo');
    expect(response.body).toHaveProperty('expireDate');
    expect(response.body).toHaveProperty('cpf');
    expect(response.body.cardNo).toEqual(userPaymentInfoEditData.cardNo);
    expect(response.body.cvvNo).toEqual(userPaymentInfoEditData.cvvNo);
    expect(response.body.cpf).toEqual(userPaymentInfoEditData.cpf);
  });

  test("PATCH /users/payment_info/:id - Should not be able to edit a user's payment/card information that does not exist", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .patch(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test("PATCH /users/payment_info/:id - Should not be able to edit a user's payment/card information into an already existing CPF", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const addPaymentInfo = await request(app)
      .post(`/users/payment_info/${createdUser201Id}`)
      .send(userPaymentInfoDummy2);

    const response = await request(app)
      .patch(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test("PATCH /users/payment_info/:id - Should not be able to edit a user's payment/card information without a token", async () => {
    const response = await request(app)
      .patch(`/users/payment_info/${createdUser200Id}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("PATCH /users/payment_info/:id - Should not be able to edit a user's payment/card information with an invalid token", async () => {
    const response = await request(app)
      .patch(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${fakeToken}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("PATCH /users/payment_info/:id - Should not be able to edit another user's payment/card information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/payment_info/:id - Should not be able to edit payment/card information using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`)
      .send(userPaymentInfoEditData);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/delete/deactivate - Should be able to soft delete a user', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    persistentToken = loginUser.body.token;

    const softDelete = await request(app)
      .patch('/users/delete/deactivate')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const response = await request(app)
      .get(`/users/profile`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(softDelete.status).toBe(204);
    expect(response.body.isActive).toEqual(false);
  });

  test('PATCH /users/delete/deactivate - Should not be able to soft delete an already deactivated user', async () => {
    const response = await request(app)
      .patch('/users/delete/deactivate')
      .set('Authorization', `Bearer ${persistentToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('PATCH /users/delete/deactivate - Should not be able to login when user is not active', async () => {
    const response = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('PATCH /users/delete/deactivate - Should not be able to soft delete a user without a token', async () => {
    const response = await request(app).patch('/users/delete/deactivate');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/delete/deactivate - Should not be able to soft delete a user with an invalid token', async () => {
    const response = await request(app)
      .patch('/users/delete/deactivate')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/delete/deactivate - Should not be able accessible with a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .patch('/users/delete/deactivate')
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /users/:id - Should be able to delete a user', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const deleteReq = await request(app)
      .delete(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const response = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(deleteReq.status).toBe(204);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('DELETE /users/:id - Should not be able to delete a user without a token', async () => {
    const recreateUser201 = await request(app)
      .post('/users')
      .send(mockedUser201);

    createdUser201Id = recreateUser201.body.id;

    const response = await request(app).delete(`/users/${createdUser201Id}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/:id - Should not be able to delete a user without a token', async () => {
    const response = await request(app)
      .delete(`/users/${createdUser201Id}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/:id - Should not be able to delete a user other than self', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/users/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/:id - Should not be able to delete a user using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/users/${createdUser200Id}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /users/addresses/:id - Should be able to delete a registered address', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const addAddress = await request(app)
      .post('/users/addresses')
      .send(userAddressDummy)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    userAddressId201 = addAddress.body.address[0].id;

    const beforeDelete = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const deleteAddresReq = await request(app)
      .delete(`/users/addresses/${userAddressId201}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const afterDelete = await request(app)
      .get('/users/addresses')
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(beforeDelete.body.address).toHaveLength(1);
    expect(deleteAddresReq.status).toBe(204);
    expect(afterDelete.body.address).toHaveLength(0);
  });

  test('DELETE /users/addresses/:id - Should not be able to delete an address without a token', async () => {
    const response = await request(app).delete(
      `/users/addresses/${userAddressId201}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/addresses/:id - Should not be able to delete an address with an invalid token', async () => {
    const response = await request(app)
      .delete(`/users/addresses/${userAddressId201}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/addresses/:id - Should not be able to delete an address that belongs to another user', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/users/addresses/${userAddressId200}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('DELETE /users/addresses/:id - Should not be able to delete an address using a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/users/addresses/${userAddressId201}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /users/addresses/:id - Should not be able to delete an address that does not exist', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/users/addresses/${fakeAddressId}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test("DELETE /users/payment_info/:id - Should be able to delete a user's payment/card information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .post(`/users/payment_info/${createdUser201Id}`)
      .send(userPaymentInfoDummy3);

    const beforeDelete = await request(app)
      .get(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const deletePaymentReq = await request(app)
      .delete(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    const afterDelete = await request(app)
      .get(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(beforeDelete.body).toHaveProperty('id');
    expect(deletePaymentReq.status).toBe(204);
    expect(afterDelete.body).not.toHaveProperty('id');
    expect(afterDelete.body).toHaveProperty('message');
    expect(afterDelete.status).toBe(404);
  });

  test('DELETE /users/payment_info/:id - Should not be able to delete a payment/card information without a token', async () => {
    const response = await request(app).delete(
      `/users/payment_info/${createdUser201Id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/payment_info/:id - Should not be able to delete a payment/card information with an invalid token', async () => {
    const response = await request(app)
      .delete(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("DELETE /users/payment_info/:id - Should not be able to delete another user's payment/card information", async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/users/payment_info/${createdUser200Id}`)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /users/payment_info/:id - Should not be accessible with a restaurant token', async () => {
    const loginRestaurant = await request(app)
      .post('/login/restaurants')
      .send(mockedRestaurantLogin);

    const response = await request(app)
      .delete(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginRestaurant.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('DELETE /users/payment_info/:id - Should not be able to delete a payment/card information that does not exist', async () => {
    const loginUser = await request(app)
      .post('/login/users')
      .send(mockedUser201Login);

    const response = await request(app)
      .delete(`/users/payment_info/${createdUser201Id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });
});
