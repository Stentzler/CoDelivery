import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import {
  loginNoEmail,
  loginNoPassword,
  loginWrongPassword,
  mockedUser200,
  mockedUserLogin,
} from '../../mocks';

describe('/login', () => {
  let connection: DataSource;

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

  test('POST /login/users - Should be able to successfully login', async () => {
    const createUser = await request(app).post('/users').send(mockedUser200);

    const response = await request(app)
      .post('/login/users')
      .send(mockedUserLogin);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  test('POST /login/users - Should not be able to login with missing email', async () => {
    const response = await request(app).post('/login/users').send(loginNoEmail);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/users - Should not be able to login with missing password', async () => {
    const response = await request(app)
      .post('/login/users')
      .send(loginNoPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /login/users - Should not be able to login with wrong password', async () => {
    const response = await request(app)
      .post('/login/users')
      .send(loginWrongPassword);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
